# regme-microservices

## Running regme with fuge

#### Step 0: Install fuge

Follow the instructions at [fuge repository](https://github.com/apparatus/fuge).


#### Step 1: Clone the repository

```sh
$ git clone https://github.com/TomerG2/regme-microservices.git
```

#### Step 2: Download dependencies

```sh
$ npm install
```

#### Step 3: Run fuge

From within the repository folder, run the fuge shell.

```sh
$ fuge shell fuge/system.yml
```

This will start fuge and output some logging messages:

```sh
...
starting shell..
? fuge>
```

Useful commands are `ps` to list the status of the services.
`exit` to shutdown all services and exit.

#### Step 4: Start up the system

Start the system:

```sh
...
? fuge> start all
```