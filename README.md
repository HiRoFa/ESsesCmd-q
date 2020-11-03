# ESsesCmd-q

ESsesCmd-q is a commandline JavaScript interpreter based on [ESsesLib-q](https://github.com/HiRoFa/ESsesLib-q) which is in turn based on [quickjs](https://github.com/bellard/quickjs).

For a list of features that work in script here you should check out the [ESsesLib-q](https://github.com/HiRoFa/ESsesLib-q) project.

## commandline

running with a script

```essescmd_q test.es```

continue running after script has completed (interactive mode)

```essescmd_q -i test.es```

or without using a file

```essescmd_q -i'```

verbose mode

```essescmd_q -v'```