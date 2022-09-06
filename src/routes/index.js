const {Router} = require('express');
const pool = require('../database');
const router = Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.post('/create-room', async(req,res)=>{
    const newRoom = {
        name_room: req.body["name-room"]
    } 
    await pool.query('INSERT INTO rooms set ?', [newRoom]);
    res.redirect('/');
});

router.post('/join', async(req,res)=>{
    const room_name = req.body["name-room"];
    const user = req.body.Username;
    const p = await pool.query('SELECT * FROM rooms WHERE name_room = ?', [room_name]);
    if(p[0]){
        console.log("existe");
        res.redirect(`/sala/${room_name}/${user}`);
    }
});
router.get('/sala/:sala/:user', (req,res)=>{
    const Username = req.params.user;
    res.render('links/sala.hbs');
});

module.exports = router;