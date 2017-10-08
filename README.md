# Essential Platform Back

The Essential Platform Project.

The platform registers users and provide on demand OrthoMCL executions. To more information about the prebuilt Essential Proteins, see files/rawFasta.

# Before you start

To build and run the platform you must have the following dependencies installed:

+ MySQL
+ NodeJS >= 8
+ blastp >= 2.2.30
+ mcl >= 12-135
+ OrthoMCL

All the dependencies must be exported to the terminal path.

To verify if you have all the dependencies, open a terminal and run the following:

```bash
node -v
blastp -version
mcl --version
```

If you don't have OrthoMCL installed, refer to the [official repository](https://github.com/stajichlab/OrthoMCL).

# Configuration

Some configurations are required to run the full platform.

## NodeJS Server

In order to run the server, you need to create a database and configure the database options on ```services/database.js```:

```javascript
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'essential',
    },
    debug: (process.env.DEBUG || false),
});
```

Once you set up the database configuration, run the script ```npm run bootstrap``` inside the project root. It'll drop and create the required schema on the database.

## OrthoMCL

In order to run the OrthoMCL job, you must install the following external dependencies and put them on the bash path (if Ubuntu, ```~/.bashrc```).

+ MySQL
+ blastp
+ mcl
+ OrthoMCL

After installing all the dependencies and exporting them to the system path, create a new database named ```orthomcl``` on your MySQL database and add the database configuration to the file ```files/configuration/orthomcl.config```.

Ex.:

```conf
dbVendor=mysql
dbConnectString=dbi:mysql:orthomcl:localhost:3306:mysql_local_infile=1
dbLogin=root
dbPassword=root
similarSequencesTable=SimilarSequences
orthologTable=Ortholog
inParalogTable=InParalog
coOrthologTable=CoOrtholog
interTaxonMatchView=InterTaxonMatch
evalueExponentCutoff=-2
percentMatchCutoff=20
oracleIndexTblSpc=None
```

After these steps you can build the application.

# Building the application

Just run the ```build.sh``` script on the project root folder. It will build the back end and the front end applications.

# Running

In order to run the full platform, you must start the server and the watcher as follows:

+ The command ```npm start``` will start the NodeJS server.

+ The command ```npm run orthomcl``` will start the OrthoMCL watcher and worker.

Once you start the server and the worker, open your browser and go to ```http://localhost:8080/``` and you must see the login screen.

# How it works

The platform works as described bellow:

+ A logged user send a new job request, with a fasta file to the NodeJS server.

+ The NodeJS server registers the task and sends an OK answer to the client.

+ The watcher keeps watching new jobs. Once the watcher finds the requested job, it will run the OrthoMCL stack and update the job.

+ The logged user goes to the "My Jobs" table and clicks on the Job row. If the job is finished with the "Success" status, the server sends the result file to the client.

# License

The platform is under the MIT license.
