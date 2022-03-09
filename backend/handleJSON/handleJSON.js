const {readFile , writeFile } = require('fs/promises')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

module.exports = {
    // Check if a JSONfile exists , if not create
    check(pathTo){
        if (!(fs.existsSync(pathTo))) {
            fs.writeFileSync(pathTo , JSON.stringify([]))
        }
    },

    // Get all the data from the JSON file according to the name of file and its path.
    async getData(pathTo) {
        this.check(pathTo)
        
        const data = await readFile(pathTo , "utf8")
        
        return JSON.parse(data)
    },

    // Get a specific data from the JSON file according to the name of file ,its path and id.
    async findByID(pathTo , id) {
        this.check(pathTo)
        
        const data = await this.getData(pathTo)
        if(!id) return data

        return data.find(elem => elem.id === id)
    } ,

    // Get a specific data from the JSON file according to the name of file ,its path and email.
    async findByEmail(pathTo , email) {
        this.check(pathTo)
        
        const users = await this.getData(pathTo)
        if(!email) return users
        
        return users.find(elem => elem.email === email)
    } ,

    // Create a new data pushing it to the JSON file
    async createData(pathTo , data) {
        this.check(pathTo)

        const dataFile = await this.getData(pathTo)

        dataFile.push(data)

        await writeFile(pathTo , JSON.stringify(dataFile))
        
        return data
    } ,

    // Update a data in JSON file
    async updateData(pathTo , id , updatedData) {
        this.check(pathTo)

        const totalData = await this.getData(pathTo)

        const index = totalData.findIndex(data => data.id === id)
       
        totalData[index] = updatedData;

        await writeFile(pathTo , JSON.stringify(totalData))

        return updatedData;
    } , 

    // Delete data from JSON file
    async deleteData(pathTo , id) {
        this.check(pathTo)

        const totalData = await this.getData(pathTo)
        
        const index = totalData.findIndex(data => data.id === id)

        const deletedData = totalData.splice(index , 1)[0]

        await writeFile(pathTo, JSON.stringify(totalData))

        return deletedData;
    } , 

    // Generate a ID
    generateID(){
        const id = Math.floor(Date.now() * Math.random()).toString(36)
        return id
    } ,
}