import * as SQLite from "expo-sqlite"

function abreConexao(){
    const database = SQLite.openDatabase("nomeDoBancoDeDados.db")
}

export const db = abreConexao()