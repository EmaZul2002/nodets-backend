import { APIGatewayProxyResult } from "aws-lambda"
import { createConnection } from "mysql2/promise"

export const hello = async () =>  {
    console.log("Hello World!")
    return "Hello World"
}

export const goodbye = async () => {
    console.log("Goodbye Wordl!")
    return "Goodbye Wordl!"
}

export const getAllPatients = async (): Promise<APIGatewayProxyResult> => {
    try {
        const dbConnection = await createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAMEDB,
            port: parseInt(process.env.DB_PORT || "3306")
        })

        const [rows] = await dbConnection.query("SELECT * FROM Pazienti")
        await dbConnection.end()

        console.table(rows)
        
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(rows)
        }
    
        return response; 
           
    } catch (error) {
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify({
                message: error
            })
        }
        return response; 
    }
    
    
}

export const getPatient = async (): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({
            nome: "Joao",
            cognome: "Silvia",
            dataNascita: "01/01/1990"
        }),
    }

    return response
}
