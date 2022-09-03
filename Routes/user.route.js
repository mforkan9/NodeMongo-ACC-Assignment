const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


router.get('/', (req, res) => {
    fs.readFile(path.resolve(__dirname, '../MOCK_DATA.json'), (err, data) => {
        if (err) throw err;
        const datas = JSON.parse(data)
        let profile = []
        for (let i = 0; i <= 11; i++) {
            const idx = Math.floor(Math.random() * datas.length)
            const element = datas[idx];
            profile.push(element)
            datas.splice(idx, 1)

        }
        // console.log(profile)
        res.render(path.resolve(__dirname,'../home.ejs'), {
            user: profile,
            data: datas.length,
            allData: '',
            findUser: ''
        })
    })
})

router.get('/allData', (req, res) => {
    fs.readFile(path.resolve(__dirname, '../MOCK_DATA.json'), (err, data) => {
        if (err) throw err;
        const userAllData = JSON.parse(data)
        let allData = []
        for (let i = 0; i <= userAllData.length; i++) {
            // const element = userAllData[i]
            const idx = Math.floor(Math.random() * userAllData.length)
            const element = userAllData[idx];
            allData.push(element)
            // datas.splice(idx, 1)

        }
        //console.log('all data....',allData)
        res.render(path.resolve(__dirname,'../home.ejs'), {
            allData: allData,
            data: '',
            user: '',
            findUser: ''
        })
    })
})

router.post('/createUser',(req,res) =>{
    const {name,gender,email,address,contact} = req.body
    const id = Math.floor((Math.random()*1000))
    const newData = {
        id:id,
        name:name,
        gender:gender,
        email:email,
        address:address,
        contact:contact,
        photo_url:'https://robohash.org/autofficiaet.jpg?size=500x500&set=set1'
    }

         
    fs.readFile(path.resolve(__dirname,'../MOCK_DATA.json'),'utf8', function(err,data){
        let obj = JSON.parse(data);
        obj.push(newData);
        const strNotes = JSON.stringify(obj,null,2);
        fs.writeFile(path.resolve(__dirname,'../MOCK_DATA.json'),strNotes, function(err){
            if(err) return console.log(err);
            console.log('Note added');
        });

        res.redirect('/')

    })

 
})

router.get('/:id', (req, res) => {
    const deleteId = req.params.id
    fs.readFile(path.resolve(__dirname, '../MOCK_DATA.json'), (err, data) => {
        if (err) throw err;
        let datas = JSON.parse(data)
        datas = datas.filter(data => data.id !== Number(deleteId))
        fs.writeFileSync(path.resolve(__dirname, '../MOCK_DATA.json'), JSON.stringify(datas, null, 2))

        res.redirect('/')
    })
})

router.get('/update/:id', (req, res) => {
    console.log(req.params.id)
    fs.readFile(path.resolve(__dirname, '../MOCK_DATA.json'), (err, data) => {
        if (err) throw err;
        let datas = JSON.parse(data)
        let findData = []
        const dar = datas.find(ps => ps.id === Number(req.params.id))
        findData.push(dar)

        res.render(path.resolve(__dirname,'../home.ejs'), {
            findUser: findData,
            user: '',
            allData: '',
            data: ''

        })
    })
})

router.post('/updateData', (req, res) => {
    const { id, name, email, gender, contact, address } = req.body
    fs.readFile(path.resolve(__dirname, '../MOCK_DATA.json'), (err, data) => {
        if (err) throw err;
        let datas = JSON.parse(data)
        // let filterData = []
        let dar = datas.find(ps => ps.id === Number(id))
        dar.name = name
        dar.email = email
        dar.gender = gender
        dar.contact = contact
        dar.address = address
        console.log(dar.name)
        fs.writeFileSync(path.resolve(__dirname, '../MOCK_DATA.json'), JSON.stringify(datas, null, 2))

        res.redirect(`/update/${id}`)
    })
})



module.exports = router;