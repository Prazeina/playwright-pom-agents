import fs from 'fs'
import { parse } from 'csv-parse/sync'

export function readCSV(filePath){
    const fileContent = fs.readFileSync(filePath)

    const records = parse(fileContent, {
        columns: true, //first row becomes keys
        skip_empty_lines: true
    })
    return records
}