# To-do list MERN app

This is suppose to be just a simple to-do list application

## Usage

### JSON file
- If you want to test this API while it's not currently connected to a database yet, you can modify and append some data manually to a file called ``` tasks.json``` or by POST requests.

- The file will be created automatically when you start the server.

- The ``` tasks.json``` must have an array that contains objects with the following keys : ``` descriptions```  and  ``` due```.

- Do not delete all the content present in ``` tasks.json```. In order to this API to work this file must have at least an empty array.

Recomendations :

```
[
  { "id": "bznvytiv", "description": "Wash dishes", "due": "Tonight", "status": "In progress" },
  {"id": "dl8wxlaz", "description": "Take trash out", "due": "Tomorrow", "status": "In progress"},
  {"id": "cucpbdn4", "description": "Clean Room", "due": "Sunday", "status": "In progress" },
  {"id": "g2yxyogi", "description": "Do math exercises", "due": "Tuesday", "status": "In progress"},
  {"id": "fdsfjhl6", "description": "Programming", "due": "Everyday","status": "In progress"}
]
```


### Install dependencies

```
npm i
```

### Run Server

```
npm start

```

### Observations
```
Maybe in the future , this API can be connected to a database.
```
