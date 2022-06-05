
  
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
                <li class="title">
                    アップorダウン
                </li>
                <li>
                    <label>
                        <input @click="downUp(1)" type="radio" name="up_down" value="アップ" checked>
                        アップ
                    </label>
                </li>
                <li class="to_left">
                    <label>
                        <input @click="downUp(2)" type="radio" name="up_down" value="ダウン">
                        ダウン
                    </label>
                </li>
            </ul>
        </div>
        <div class="target_present">
            <ul class="to_left contents">
                <li class="title">目標値・現在値</li>
                <li v-for="target_present in target_presents" :key="target_present">
                    {{ target_present }}
                </li>
            </ul>
            <ul class="contents desc_about_meter">
                <li class="title">
                    ※目標値<span>{{ sign }}</span>現在値
                </li>
                <li>
                    <select name="select_target" @change="doTargetPresent($event, 1)">
                        <option v-for="select_number in select_numbers" :value="select_number.target" :key="select_number.target">
                            {{ select_number.target }}
                        </option>
                    </select>
                </li>
                <li>
                    <select name="select_present" class="to_left" @change="doTargetPresent($event, 2)">
                        <option v-for="select_number in select_numbers" :value="select_number.present" :key="select_number.present">
                            {{ select_number.present }}
                        </option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="contents picture_word_no">
            <ul class="contents picture_word">
                <li class="title">写真or文字orなし</li>
                <li class="to_left">
                    <label class="left_center" v-for="(image, index) in images" :key="image" @change="pictureWord(index)">
                        <input type="radio" name="image" checked>
                        {{ image }}
                    </label>
                </li>
            </ul>
            <div class="show_word">
                <div class="written" v-if="show_select_word">
                    <ul v-for="word_data in words_data" :key="word_data">
                        <li>{{ word_data }}</li>
                    </ul>
                </div>
                <div class="picture_show" v-if="show_select_picture">
                    <ul v-for="img_data in imgs_data" :key="img_data">
                        <li>
                            <img :src="img_data" alt="選択した画像">
                        </li>
                    </ul>
                </div>
                <div class="text_write_in button_select" v-if="show_select_word">
                    <input type="text" @change="decidedWord" v-model="written" placeholder="文字を入力して下さい" value="" maxlength="10">
                </div>
                <div class="file_button button_select" v-if="show_select_picture">
                    <input name="picture" type="file" ref="preview" @change="selectPicture">
                </div> 
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
import { confirm } from '@/components/confirmation/confirm_person';

@Component
export default class Option extends Vue {
    target_presents: string[] = ["目標値", "現在値"];
    select_numbers: {target: number, present: number}[] = [{target: 0, present: 0}];
    images: string[] = ["写真", "文字", "なし"];
    show_select_picture: boolean = false;//写真選択の表示
    show_select_word: boolean = false;//文字の記入
    written: string = "";//画面に表示する文字
    imgs_data: (string | ArrayBuffer | null)[] = [require("@/static/edit/hatena.png")];
    post_image: any[] = [];
    words_data: string[] = [];
    word_position: number = 0;
    count_num: number = 0;
    sign: string = "＞";
    target_number: string = "";
    attention: string = "";//不等号に逆らった時
    save_storage: (string | number | ArrayBuffer | null)[] = ["＞", 0, 0, ""];//保存[不等号,目標値,現在値,写真]
    
    doSplice = (num1: number, num2: number, changed: (string | number | ArrayBuffer | null)) => {//splice function
        this.save_storage.splice(num1, num2, changed);
    };

    doArray = (max: number) => {//配列
        for(let i=1; i <= max; i++) {
            this.select_numbers.push({target: i, present: i});
            
        } 
    };

    head() {
        return {
            title: 'カウンターオプション'
        }
    }


beforeMount() {
        
    if(this.$route.params.optionNum !== "free") {

        console.log('go mount');

        const username = this.$store.state.username;
        confirm(username);

    }
    
        
}

created(): void{//選択の数字

    this.doArray(200); 

    //planをvuexに入れる
    const plan = this.$route.params.optionNum
    this.$store.dispatch("planSelect_arrayDelete", plan);

    console.log(this.imgs_data);

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

    if(this.words_data !== []) {//写真や文字入力中のときの目標値・現在値の変更 写真や文字をリセット
        
        this.written = "";
        this.words_data.splice(0, this.words_data.length);
        this.word_position = 0;
        this.imgs_data.splice(0, this.imgs_data.length);
        this.count_num = 0;

    }

    const target_present = (<HTMLInputElement>event.target).value;
    
    if(divide === 1) {

        this.doSplice(1, 1, Number(target_present));

    } else {

        this.doSplice(2, 1, Number(target_present));

    }

}

selectPicture(e: Event){//写真

    const file = (<HTMLInputElement>e.target).files![0];

    const selector_img_data = (img: (string | ArrayBuffer | null)) => {//画像データの扱いを実行(ここから)

        if(this.count_num > 9) {//10個まで
            
            return;

        }

        let change_num = 0;

        if(this.$route.params.optionNum === "free") {//パラメーターがfreeのときは固定

            change_num = 1;
            this.count_num = 0;
            this.imgs_data.splice(1, 1);//はてなを削除

            this.doSplice(3, 1, file.name);
            
        } else {//free以外のとき

            if(this.save_storage[0] === "＜") {

                if(typeof(this.save_storage[1]) === "number" && typeof(this.save_storage[2]) === "number") {//NUMBERのとき

                    const differential: number = this.save_storage[2] - this.save_storage[1];//＜のときの差分
                

                    if(differential <= this.count_num) {//これ以上の画像追加はできない
               
                        return;
                    }

                }

            }

            if(this.count_num === 0) {//はじめの１回

                change_num = 1;

                //はてなを追加
                this.imgs_data.splice(1, 0, require("@/static/edit/hatena.png"));
                
            } else if(this.count_num === 9) {

                this.imgs_data.splice(9, 1);//はてなを削除

            }

        }

        this.imgs_data.splice(this.count_num, change_num, img);//配列を変える
        this.post_image.splice(this.count_num, change_num, file);
        this.count_num++;//配列の順番を+1

    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {

        const result = reader.result;
            
        selector_img_data(result);//画像データの扱いを実行

    })

    reader.readAsDataURL(file);//URL作成
    
}

decidedWord(): void {//文字

    if(this.$route.params.optionNum === "free") {
        
        this.words_data.splice(0, 1, this.written);
        this.doSplice(3, 1, this.written);

    } else {

        if(this.save_storage[0] === "＜") {

            if(typeof(this.save_storage[1]) === "number" && typeof(this.save_storage[2]) === "number") {

                const differential: number = Number(this.save_storage[2]) - Number(this.save_storage[1]);//＜のときの差分
      
                if(differential <= this.word_position) {//これ以上の画像追加はできない
               
                    return;
                }

            }
            
        }

        if(this.word_position < 10) {//10まで追加できる

            this.words_data.splice(this.word_position, 0, this.written);
            this.written = "";
            this.word_position++;

        }
        

    }
 
}

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

    const send_data_go = () => {//実行

        let send_array: (string | ArrayBuffer | null)[] = this.words_data;//文字のデータを送る

        if(this.$route.params.optionNum !== "free") {//パラメータがfree以外のとき
            

            if(this.show_select_picture) {//写真のデータを送る

                for(let i=0; i < this.post_image.length; i++) {

                    send_array.splice(i, 1, this.post_image[i].name);

                }
                    
            }

            console.log(send_array);

            if(!this.show_select_word && !this.show_select_picture) {//ナシを選択したときのデータ

                send_array.splice(0, 0, "");

            }

            if(send_array.length === 0) {//写真、文字を選択したにもかかわらず、空だったとき

                this.attention = "写真または文字がありません。";
                return;
            }

            console.log(send_array + 'ui');

            //this.$store.dispatch("inSelectData", send_array);

                
        }

        let send_contents = "img";//画像か写真か

        //データをVuexへ
        const url_name =  this.$route.params.optionNum;

        if(!this.show_select_picture) {//画像選択していないとき

            if(this.show_select_word) {//文字を選択したとき

                send_contents = "word";

            } else {//なしを選択したとき

                send_contents = "nothing";

            }

            row.splice(4, 0, send_contents);
            console.log(row);
            console.log(send_array);
            //this.$router.push('/counterDo/counter_this/' + url_name);
            this.$store.dispatch("inSelectData", send_array);
            this.$store.dispatch("inData", row);//基本データ
            

            this.$router.push('/counterDo/counter_this/' + url_name);
            return;
 

        }

        //row.splice(4, 0, send_contents);

        //this.$store.dispatch("inData", row);//基本データ
        console.log(row);

        

        //画像データをサーバーへ
        console.log(this.post_image);
        const formData = new FormData();

        for(let key=0; key < this.post_image.length; key++) {

            formData.append(String(key), this.post_image[key]);

        }

        formData.append('data_length', String(this.post_image.length));

        console.log(formData);

        this.$axios.post('counter_image', formData)
        .then((response) => {

            console.log(response.data[0]);

            row.splice(4, 0, send_contents);
            console.log(row);
            console.log(send_array);

            if(this.$store.state.select_plan === "free") {

                row[3] = response.data[0];
            } else {

                for(let i=0; i < response.data.length; i++) {
                    send_array.splice(i, 1, response.data[i]);
                }

                this.$store.dispatch("inSelectData", send_array);

            }
            this.$store.dispatch("inData", row);//基本データ

        })
        .catch((err) => {
            console.log(err);
        });

        console.log(this.words_data);

        this.$router.push('/counterDo/counter_this/' + url_name);

    }


    if(this.save_storage[0] === "＞") {

        if(typeof(this.save_storage[1]) === "number" && typeof(this.save_storage[2]) === "number") {

            if(this.save_storage[1] > this.save_storage[2]) {

                //値が正しければ次へ実行
                send_data_go();
                return;
                
            } 
        }
    }
        
    if(this.save_storage[0] === "＜") {

        if(typeof(this.save_storage[1]) === "number" && typeof(this.save_storage[2]) === "number") {

            if(this.save_storage[1] < this.save_storage[2]) {

                console.log('ui');

                //値が正しければ次へ実行
                send_data_go();
                return;

            }
        }
    
    }

    this.attention = "目標値・現在値が正しくありません";
   
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

        .title {/*横にする */

            float: left;

        }

        .desc_about_meter li { /*目標値と値 */

            select {
                width: 80px;
                height: 40px;
                font-size: 20px;
            }

        }
        
        .to_left {
            
            margin-right: $em_size * 6;

            li{

                margin-right: 1.5rem;

            }
            
        }

        .picture_word li {

            margin-top: 80px;
            
        }

        .show_word {/* 写真or文字orなし */

            font-size: 25px;
            margin-left: 1rem;

            .written {

                display: flex;
                margin-left: 51%;
                flex-wrap: wrap;
                width: 1180px;
                transform: translateX(-50%);
                color: white;
                background-color: rgba(0, 0, 0, 0.7);

                ul li {

                    width: 220px;
                    background-color: rgba(0, 255, 255, 0.7);
                    margin-right: 2rem;
                    
                }
                
            }

            .text_write_in {
                margin-left: 2rem;
            }

            .picture_show {

                width: 890px;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-wrap: wrap;
                margin-left: 50%;
                transform: translateX(-50%);


                img {
                    width: 110px;
                    display: inline;
                    background-color: rgb(235, 235, 235);

                } 

            }

            .button_select {

                margin-top: 20px;

            }

        } 

        .end_button {

            margin-left: 1rem;

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