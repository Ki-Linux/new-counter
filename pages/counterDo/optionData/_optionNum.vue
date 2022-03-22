
  
<template>
    <div class="first_option">
        <h1>設定</h1>
        <div class="desc">
            <ul>
                <li>アップ…目標値に向かってプラスのカウントを行う</li>
                <li>ダウン…現在値から0に向かってマイナスのカウントを行う</li>
            </ul>
        </div>
        <div class="up_or_down">
            <ul class="contents">
                <li>アップorダウン</li>
                <li><label><input @click="downUp(1)" type="radio" name="up_down" value="アップ" checked>アップ</label></li>
                <li class="to_left"><label><input @click="downUp(2)" type="radio" name="up_down" value="ダウン">ダウン</label></li>
            </ul>
        </div>
        <div class="target_present">
            <ul class="to_left contents">
                <li v-for="target_present in target_presents" :key="target_present">{{ target_present }}</li>
            </ul>
            <ul class="contents desc_about_meter">
                <li>※目標値<span>{{ sign }}</span>現在値となるようにしてください</li>
                <li>
                    <select name="select_target" @change="doTargetPresent($event, 1)">
                        <option v-for="select_number in select_numbers" :value="select_number.target" :key="select_number.target">{{ select_number.target }}</option>
                    </select>
                </li>
                <li>
                    <select name="select_present" class="to_left" @change="doTargetPresent($event, 2)">
                        <option v-for="select_number in select_numbers" :value="select_number.present" :key="select_number.present">{{ select_number.present }}</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="contents picture_word_no">
            <ul class="contents picture_word">
                <li>写真or文字orなし</li>
                <li class="to_left"><label v-for="(image, index) in images" :key="image" @change="pictureWord(index)"><input type="radio" name="image" checked>{{ image }}</label></li>
            </ul>
            <div class="show_word">
                <p>{{ written }}</p>
                <input v-if="show_select_picture" name="picture" type="file" ref="preview" @change="selectPicture">
                <input v-if="show_select_word" type="text" @change="decidedWord" v-model="written" placeholder="文字を入力して下さい" value="">
            </div>
        </div>
        <div class="end_button">
            <p>{{ attention }}</p>
            <button @click="toNext(save_storage)">決定</button>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Option extends Vue {
    target_presents: string[] = ["目標値・現在値", "目標値", "現在値"];
    select_numbers: {target: number, present: number}[] = [{target: 0, present: 0}];
    images: string[] = ["写真", "文字", "なし"];
    show_select_picture: boolean = false;//写真選択の表示
    show_select_word: boolean = false;//文字の記入
    written: string = "";//画面に表示する文字
    sign: string = "＞";
    target_number: string = "";
    attention: string = "";//不等号に逆らった時
    save_storage: [string, number, number, string] = ["＞", 0, 0, ""];//保存[不等号,目標値,現在値,写真]
    doSplice = (num1: number, num2: number, changed: (number|string)) => {//splice function
        this.save_storage.splice(num1, num2, changed);
    };
    doArray = (max: number) => {//配列
        for(let i=1; i <= max; i++) {
            this.select_numbers.push({target: i, present: i});
            
        } 
    };
created(): void{//選択の数字
    this.doArray(200); 
}
downUp(which_is: number): void {
    if(which_is == 1) {
        this.sign = "＞";
        this.doSplice(0, 1, "＞");
    } else {
        this.sign = "＜";
        this.doSplice(0, 1, "＜");
    }
    
}
doTargetPresent(event: Event, divide: number): void {
    /*if(!(val.target instanceof HTMLInputElement)) {
        return;
    }*/
    //console.log((<HTMLInputElement>event.target).value);
    const target_present = (<HTMLInputElement>event.target).value;
    if(divide == 1) {
        this.doSplice(1, 1, target_present);
    } else {
        this.doSplice(2, 1, target_present);
    }
    
}
selectPicture(e: Event): void{//写真
        const  file = (<HTMLInputElement>e.target).files![0];
        const file_url = URL.createObjectURL(file);
        //console.log(this.img_picture)
        this.doSplice(3, 1, file_url);
}
decidedWord(): void {//文字
    console.log('it')
    this.doSplice(3, 1, this.written);
}
/*sendData(): void{
    //console.log("it");
    this.doSplice(3, 1, this.written);
}*/
pictureWord(index: number): void {//写真、文字を選択した時に写真か文字の追加
    if(index == 0) {//写真
        this.show_select_picture = true;
        this.show_select_word = false;
        this.written = "";
    } else if(index == 1){//文字
        this.show_select_word = true;
        this.show_select_picture = false;
    } else {//なし
        this.show_select_word = false;
        this.show_select_picture = false;
        this.written = "";
        this.doSplice(3, 1, "なし");
    }
}  
    toNext(row: [string, number, number, string]): void {
    //console.log(this.save_storage);//保存[不等号,目標値,現在値,写真]
        if(this.save_storage[0] === "＞") {
            if(this.save_storage[1] > this.save_storage[2]) {
                this.$store.dispatch("inData", row);
                this.$router.push('/counterDo/counter_this/free');
            } else {
                this.attention = "目標値・現在値が正しくありません";
            }
        }
        
        if(this.save_storage[0] === "＜") {
            if(this.save_storage[1] < this.save_storage[2]) {
                this.$store.dispatch("inData", row);
                this.$router.push('/counterDo/counter_this/free');
            } else {
                this.attention = "目標値・現在値が正しくありません";
            }
        }
        //const not_send: boolean = (row[0] == "＞" && row[1] <= row[2]);
        //const not_send_two:boolean = (row[0] == "＜" && row[1] >= row[2]);
        //if(!not_send && !not_send_two) {
                        
            //データをVuexへ
            this.$store.dispatch("inData", row);
            //次のページへ
            //this.$router.push('/free_login_bothupdown');
        /*} else {
            this.attention = "目標値・現在値が正しくありません";
        }*/
        //console.log(row);
    }
}
</script>
<style lang="scss">
    html { /*背景色*/
        background-color: #09eea999;
    }
    .first_option {/*白い部分*/
        $em_size: 2em;/*em*/
        background-color: white;
        text-align: center;
        margin-top: $em_size * 6;
        padding-top: 50px;
        ul {/* 文字の大きさ */
            list-style: none;
            li{
                display: inline-block;
                padding:0 10px;
                font-size: 20px;
            }
        }
        .up_or_down ul{/*アップorダウン*/
            margin-right: $em_size * 6;
            li{
                margin:80px 0;
            }
        } 
        .contents li:first-of-type {/*横にする */
            float: left;
        }
        .desc_about_meter li { /*目標値と値 */
            select {
                width: 80px;
                height: 40px;
                font-size: 20px;
            }
            &:nth-of-type(3) {
                margin-right: $em_size * 5;
            }
        }
        
        .to_left {
            margin-right: $em_size * 6;
        }
        .picture_word li {
            margin-top: 80px;
        }
        .show_word {/* 写真or文字orなし */
            font-size: 25px;
            input {
                font-size: 20px;
                &:nth-of-type(2) {
                    margin-right: $em_size;
                    padding: 3px 5px;
                }
            }
        } 
        .end_button {
            p {
                color: red;
            }
            button {/*ボタン*/
                margin: 50px 0 60px;
                font-size: 20px;
                padding: 7px 20px;
                color:rgb(46, 46, 46);
            }
        }
        
    }   
</style>