extern crate cmdparser;

use cmdparser::Parser;
use esses_lib_q::parallelruntime::ParallelRuntimeBuilder;
use esses_lib_q::scriptloader::FileScriptLoader;
use log::error;
use log::trace;
use std::{fs, io};
use quickjs_es_runtime::esscript::EsScript;

fn main() {
    simple_logger::init_with_level(log::Level::Info).unwrap();
    //simple_logger::init().unwrap();

    let prt = ParallelRuntimeBuilder::new()
        .thread_count(1)
        .script_loader(FileScriptLoader::new("./scripts"))
        .build();

    let (arguments, flags) = Parser::new().merge_values(true).parse();

    let f_opt = arguments.get("f");
    if let Some(f) = f_opt {
        for file_name_string in f {
            let read_res = fs::read_to_string(&file_name_string);
            if read_res.is_ok() {
                let contents = read_res.ok().unwrap();
                trace!("evalling: {}", contents);
                let res = prt.eval_sync(EsScript::new(file_name_string.as_str(), contents.as_str()));
                if res.is_err() {
                    error!("error in eval: {}", res.err().unwrap());
                }
            } else {
                error!("could not read file {}", read_res.err().unwrap());
            }
        }
    } else {
        println!("no files to run specified, use -f filename");
    }

    if flags.contains(&"i".to_string()) {
        println!("press enter to exit ESsesCmd...");
        let mut input = String::new();
        match io::stdin().read_line(&mut input) {
            Ok(_n) => {}
            Err(error) => println!("error: {}", error),
        }
    }
}

#[cfg(test)]
pub mod tests {
    #[test]
    fn test_cmd() {
        // todo refactor main so we can also start with args from test
        assert_eq!(1, 1);
    }
}
