import db from "./services"

export function createTable(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        "UserInput " + 
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, userTextInput TEXT);")
    })
}