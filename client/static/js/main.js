Vue.component('input-card', {
    template: `
    <form class="card" v-on:submit.prevent autocomplete="off">
        <div class="desc">
            <h3 class="primary-text">Calculation of driving rod length</h3>
            <!-- <h6 class="secondary-text phrase">Plase enter window dimensions:</h6> -->
        </div>
        <div class="form">
            <div class="input-fields">
                <!-- Input fields -->
                <label for="height" class="secondary-text">Window Height [mm]*</label>
                <input id='height' class="input-num" v-model="payload.height"
                type="text" required
                >
                <label for="width" class="secondary-text">Window Width [mm]*</label>
                <input id='width' class="input-num" v-model="payload.width"
                type="text" required
                >
                <label class="secondary-text drdo-drive" 
                for="drives">Select Product*</label>
                <select class="drop-down" id="drives" v-model="payload.drive" required>
                <option v-for="product in products" :value="product">{{ product }}</option>
                </select>

                <label class="secondary-text drdo-drive" 
                for="drives">Select Variant*</label>
                <select class="drop-down" id="variants" v-model="payload.variant" required>
                <option v-for="variant in variants" :value="variant">{{ variant }}</option>
                </select>

                <label class="secondary-text">Drive Offsets [mm]</label>
                <div class="coordinates">
                    <div class="c-left-lbl"><span class="secondary-text">X</span></div>
                    <input class="c-left" type="text"
                    v-model="xshift"
                    >
                    <div class="c-right-lbl"><span class="secondary-text">Y</span></div>
                    <input class="c-right" type="text"
                    v-model="yshift"
                    >
                </div>
            </div>
            <!-- Select custom drive pos 
            <div class="drive-pos">
                <label class="container">One
                    <input type="checkbox" checked="checked">
                    <span class="checkmark"></span>
                </label>
            </div> -->
        </div>
        <button class="details" @click="fetchResults">
            <div class="calculate-text">
            <h6 class="primary-text">calculate</h6>
            </div>
        </button>
    </form>
    `,
    data () {
        return {
            results: null,
            payload: {
              height: null,
              width: null,
              drive: null,
              variant: null,
            },
            products: ['F1200', 'F1200+'],
            variants: ['horizontal', 'vertical'],
            xshift: null,
            yshift: null,
        }
    },
    methods: {
        fetchResults() {
            // prevents api call if there are missing values
            for(const key of Object.keys(this.payload)){
                if ((this.payload[key] === null || this.payload[key] === "")
                && !['xshift', 'yshift'].includes(key)) {
                    return
                }
            }

            this.payload['xshift'] = this.xshift
            this.payload['yshift'] = this.yshift

            // call api endpoint
            const api = "http://localhost/hello"
            fetch(api, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                },
                "body": JSON.stringify(this.payload),
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
            result: null
        }
    },
    methods: {
        parseResults(data) {
            this.result = data
            console.log(this.result)
        },
    }
})