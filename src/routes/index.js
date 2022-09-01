const {Router} = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.post('/create-room', (req,res)=>{
    const room_name = req.body["name-room"];
    res.render('./links/sala.hbs', {room_name});
});

router.post('/join', (req,res)=>{
    const room_name = req.body["name-room"];
    res.redirect(`sala?name-room=${room_name}`);
});
router.get('/sala', (req,res)=>{
    res.render('./links/sala.hbs');
});

module.exports = router;