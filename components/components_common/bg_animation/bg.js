import * as PIXI from '../../../node_modules/pixi.js/dist/pixi.min.mjs'

export const component ={
    prerender: false,
    render,
}
console.log(PIXI);
const Application = PIXI.Application;

const app = new Application({
    antialias: true
})

app.renderer.background = "0x000000";

app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view)

function render (){
    console.log("BG _ Rendered");
    console.log(PIXI);
    const bg_textures = []
    for(let i = 1; i < 361; i++ ){
        let zeros = 4 - i.length
        let imgString = ""
        while(zeros > 0){
            imgString += 0
            zeros--
        }
        const bg_img = PIXI.Texture.from(`${imgString}.png`)
        bg_textures.push(bg_img)
    }
    const background = new PIXI.AnimatedSprite(bg_textures)
    background.position.set(800, 300)
    background.scale.set(1, 1)
    app.stage.addChild(background)
}