'use strict'

/*Modal Regiter*/
const openModalRegister = () => {
    document.getElementById('register')
        .classList.add('active')
    closeModalClientList()
}

const closeModalRegister = () => {
    document.getElementById('register')
        .classList.remove('active')
        openModalClientList()
} 

document.getElementById('btn-new-register')
    .addEventListener('click', openModalRegister)

document.getElementById('modalCloseRegister')
    .addEventListener('click', closeModalRegister)

const openModalClientList = () => {
    document.getElementById('clients-list')
        .classList.add('active')
} 

const closeModalClientList = () => document.getElementById('clients-list')
    .classList.remove('active')

document.getElementById('btn-client-list')
    .addEventListener('click', openModalClientList)

document.getElementById('btn-close-client-list')
    .addEventListener('click', closeModalClientList)

/*Modal Schedule*/
const openModalSchedule = () => {
    document.getElementById('schedule-clients')
    .classList.add('active')
    
} 

const closeModalSchedule = () => {
    clearFieldsSchedule()
    document.getElementById('schedule-clients')
    .classList.remove('active')
    window.location.reload()
} 

document.getElementById('btn-new-schedule')
    .addEventListener('click', openModalSchedule)

document.getElementById('modalCloseSchedule')
    .addEventListener('click', closeModalSchedule)



//************ CRUD NEW CLIENT ************
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//CRUD delete new client
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//CRUD Update new client
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//CRUD read new client
const readClient = () => getLocalStorage()

//CRUD Creat new client
const createClient = (client) => {

    const dbClient = getLocalStorage()

    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.querySelector('.add-clients').reportValidity()
}

//Layout interactions new client
const clearFields = () => {
    const fields = document.querySelectorAll('.input-register')
    fields.forEach(field => field.value = "")
} 

const saveClient = (e) => {
    e.preventDefault()
    if (isValidFields()) {

        const client = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            tel: document.getElementById('tel').value
        } 
        
        const index = document.getElementById('name').dataset.index
        if(index == 'new') {
            createClient(client)
            updateFormRegister()
            closeModalRegister()
        } else {
            updateClient(index, client)
            updateFormRegister()
            closeModalRegister()
        }

        
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    
    newRow.innerHTML = `
        <td class="client-index">${index}</td>
        <td>${client.name}</td>
        <td>${client.address}</td>
        <td>${client.tel}</td>
        <td>
            <button  class="btn-secondary btn-edit bx bxs-edit" id="edit-${index}"></button>
            <button class="btn-secondary  btn-delete bx bxs-trash" id="delete-${index}"></button>
        </td>
    `
    
    document.querySelector('#table-client>tbody').appendChild(newRow)
}

const clearFormRegister = () => {
    const rows = document.querySelectorAll('#table-client>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateFormRegister = () => {
    const dbClient = readClient()
    clearFields()
    clearFormRegister()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('name').value = client.name
    document.getElementById('address').value = client.address
    document.getElementById('tel').value = client.tel
    document.getElementById('name').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModalRegister()
}

const editDelete = (event) => {
    if(event.target.type == 'submit') {

        const [action, index] = event.target.id.split('-')
        if(action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm (`Would you like to delete client ${client.name}?`)
            if(response) {
                deleteClient(index)
                updateFormRegister()
            }
            
        }
    }
}

updateFormRegister()


//Events new client
document.querySelector('.btn-submit-add').addEventListener('click', saveClient)

document.querySelector('#table-client>tbody').addEventListener('click', editDelete)



//************ CRUD SCHEDULE CLIENT ************

var getLocalStorageSchedule = () => JSON.parse(localStorage.getItem('schedulesClients')) ?? []//OK

var setLocalStorageSchedule = (schedulesClients) => localStorage.setItem("schedulesClients", JSON.stringify(schedulesClients))

//CRUD delete new client
const deleteScheduling = (index) => {
    const dbSchedule = readSchedule()
    dbSchedule.splice(index, 1)
    setLocalStorageSchedule(dbSchedule)
}

//CRUD creat schedule
const createSchedule = (client) => {
    const dbSchedule = getLocalStorageSchedule()
    dbSchedule.push(client)
    setLocalStorageSchedule(dbSchedule)
}

//CRUD read Schedule
let readSchedule = () => getLocalStorageSchedule()//OK

//Layout interactions schedule
const clearFieldsSchedule = () => {//OK
    const fieldsSchedule = document.querySelectorAll('.input-schedule')
    fieldsSchedule.forEach(field => field.value = "")
}

//Creating rows to rendering on windows view
const createRowSchedule = (client, index) => {//OK
    const newRowSchedule = document.createElement('tr')
    
    newRowSchedule.innerHTML = `
        <td>${client.name_client_schedule}</td>
        <td>${client.address_schedule}</td>
        <td>${client.tel_schedule}</td>
        <td>${client.date_schedule}</td>
        <td>${client.time_schedule}</td>
        <td>
            <button id="delete-${index}" class="btn-secondary btn-delete bx bxs-trash"></button>
        </td>
    `
    
    document.querySelector('#table-schedule>tbody').appendChild(newRowSchedule)
}

const isValidFieldsSchedule = () => {
    return document.querySelector('.add-schedule').reportValidity()
}

//CRUD update scheduling
const updateFormSchedule = () => { //OK
    const dbSchedule = readSchedule()
    clearFieldsSchedule()
    dbSchedule.forEach(createRowSchedule)
}

let saveSchedule = () => {
    if (isValidFieldsSchedule()) {

        const client = {
            name_client_schedule: document.getElementById('name-client-schedule').value,
            address_schedule: document.getElementById('address-schedule').value,
            tel_schedule: document.getElementById('tel-schedule').value,
            date_schedule: document.getElementById('date-schedule').value,
            time_schedule: document.getElementById('time-schedule').value
        } 
        
        const index = document.getElementById('name-client-schedule').dataset.index
        if(index == 'new') {
            createSchedule(client)
            updateFormSchedule()
            closeModalSchedule()
        } else {
            updateFormSchedule()
            closeModalSchedule()
        }

        
    }
}

//Delete Schedules action
const deleteSchedule = (event) => {
    if(event.target.type == 'submit') {

        const [action, index] = event.target.id.split('-')
        if(action == 'delete') {
            const clientScheduled = readSchedule()[index]
            const response = confirm (`Would you like to delete client ${clientScheduled.name}?`)
            if(response) {
                deleteScheduling(index)
                updateFormSchedule()
                window.location.reload()
        } 
            
        }
    }
}

//Updating form when window starts
updateFormSchedule()

//Events Schedule
let scheduleForm = document.getElementById('schedule-form')

scheduleForm.addEventListener("submit", (e) => {//OK
    e.preventDefault()

    saveSchedule()
    window.location.reload()

})

document.querySelector('#table-schedule>tbody').addEventListener('click', deleteSchedule)

//Add client to selection's option
const getDataClient = getLocalStorage()

const settingNamesOptions = () => {
    getDataClient.forEach(nameClient => {

        let namesClientsSchedule = nameClient.name
            
        const selectScheduleClients = document.getElementById("client-name-schedule")
    
        let newOption = document.createElement("option")
        newOption.value = namesClientsSchedule
        newOption.text = namesClientsSchedule
        newOption.classList = 'input-schedule'
    
        selectScheduleClients.add(newOption)
        
    })
}

settingNamesOptions()

//Setting select value in the input

const settingDataSchedule = () => {
        const selectScheduleClients = document.getElementById("client-name-schedule")

        let optionValue = selectScheduleClients.options[selectScheduleClients.selectedIndex]
        let valueSelected = optionValue.value


        const inputSearchSchedule = document.getElementById("name-client-schedule")
        inputSearchSchedule.value = valueSelected

        

        let dataClientSelected = getDataClient.filter((client) => {
            return client.name === valueSelected
        })

        dataClientSelected.forEach(dataClient => {

            let addressClient = dataClient.address
            let telClient = dataClient.tel

            const addressField = document.getElementById('address-schedule')
            const telField = document.getElementById('tel-schedule')

            addressField.value = addressClient
            telField.value = telClient
        })
}
settingDataSchedule()


    