Vue.component('user-inputs', {
    template: `
    <!-- <div class="form" v-bind:class="{ transLeft: isShifted }" @click="updatePosition"> -->
    <div class="form">
        <form class="user-input" v-on:submit.prevent autocomplete="off">
            <!-- radio buttons for inward and outward svg -->
            <div class="opening-direction">
                <input type="radio" name="opening_dir" id="ew"  value="1" v-model="window.opening_direction" required>
                <label for="ew"><img src="static/img/inward_bh_3d_alt_bg.svg" alt=""></label>
                <input type="radio" name="opening_dir" id="aw" value="2" v-model="window.opening_direction">
                <label for="aw"><img src="static/img/outwards_window_3d_alt_bg.svg" alt=""></label>
            </div>
            <div class="window-type">
                <input type="radio" id="kipp" value="1" v-model="window.window_type" required>
                <label for="kipp"><img src="static/img/inward_bh_3d_alt_bg.svg" alt=""></label>

                <input type="radio" id="klapp" value="2" v-model="window.window_type">
                <label for="klapp"><img src="static/img/inward_th_3d_alt_bg.svg" alt=""></label>
                <!-- <p><label class="desc-text" for="kipp">Kippfenster</label></p> -->

                <input type="radio" id="dreh" value="3" v-model="window.window_type">
                <label for="dreh"><img src="static/img/inward_turn_3d_alt_bg.svg" alt=""></label>
                <!-- <p><label class="desc-text" for="kipp">Kippfenster</label></p> -->
            </div>

            <!-- <label class="drop-down-lb" for="types">Fensterart</label> <br /> 
            <select class="drop-down" id="types" v-model="window.window_type" required>
                <option :value="null" disabled selected>window type</option>
                <option v-for="type in window_types" :value="type.id">{{ type.name }}</option>
            </select> -->

            <!-- Number Inputs -->
            <input id='height' class="input-num" v-model="window.window_height" 
            type="number" placeholder="height [mm]" required
            >
            <input id='width' class="input-num" v-model="window.window_width" 
            type="number" placeholder="width [mm]" required
            >
            <input id='glazing' class="input-num" v-model="window.glas_thickness"
            type="number" placeholder="glas [mm]" required
            >
            <button id="calculate" @click="calcResults">find product</button>
        </form>
    </div>
    `,
    data () {
        return {
            window_types: null,
            window: {
                window_height: "1000",
                window_width: "1000",
                glas_thickness: "12",
                opening_direction: "1",
                window_type: "1",
            },
            isShifted: false,
        }
    },
    created () {
    },
    methods: {
        updatePosition () {
            this.isShifted = !this.isShifted
        },
        calcResults() {
            // prevents api call if there are missing values
            for(const key of Object.keys(this.window)){
                if (this.window[key] === null) {
                    return
                }
            }
            
            let api = 'http://localhost:8000/api/calc/calculate'
            fetch(api, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    },
                "body": JSON.stringify(this.window),
            })
            .then(response => response.json())
            .then(data => this.$emit('transfer-results', data))
        }
    }
})


var app = new Vue({
    el: '#app',
    data () {
        return {
            results: null,
            payload: {
              name: "Clemence",
              age: 26
            }
        }
    },
    methods: {
        fetchResults() {
            const api = "http://localhost/hello"
            fetch(api, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                },
                "body": JSON.stringify(this.payload),
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }
    }
})