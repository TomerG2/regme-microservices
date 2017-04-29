# regme-microservices

## Running regme with fuge

#### Step 0: Install fuge

Follow the instructions at [fuge repository](https://github.com/apparatus/fuge).


#### Step 1: Clone the repository

Use git to clone the repository to a local development folder of your choice

```sh
$ git clone https://github.com/TomerG2/regme-microservices.git
```

#### Step 2: Download dependencies

The system needs a number of Node.js modules from npmjs.org to
function correctly. These are the only external dependencies.

```sh
$ npm install
```

#### Step 3: Run fuge

From within the repository folder, run the fuge shell.

```sh
$ fuge shell fuge/system.yml
```

This will start fuge, output some logging messages about the ramanujan services, and then place you in an interactive repl:

```sh
...
starting shell..
? fuge>
```

Enter the command `help` to see a list of commands. Useful commands
are `ps` to list the status of the services (try it!), and `exit` to
shutdown all services and exit. If your system state becomes corrupted
in some way (this often happens during development due to bugs in
microservices), exit fuge completely and restart the fuge shell.

#### Step 4: Start up the system

To start the system, use the fuge command:

```sh
...
? fuge> start all
```