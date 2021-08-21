<template>
    <div>
        <div>
            <div class="my-4">
                <t-button @click="showLeaveModal=!showLeaveModal" type="button">Create New Leave</t-button>
            </div>
            
            <t-modal v-model="showLeaveModal" header="Leave Form">
                
                <div class="mb-4">
					<label class="label">Leave Type</label>
					<t-select
                        v-model="leaveForm.leaveType"
                        placeholder="Select an option"
                        :options="leaveTypes"
                        variant="demo"
                    ></t-select>
				</div>

				<div class="mb-4">
					<label class="label">Start date</label>
					<t-input v-model="leaveForm.startDate" value="" placeholder="DD/MM/YYYY" />
				</div>

				<div class="mb-4">
					<label class="label">End date</label>
					<t-input v-model="leaveForm.endDate" value="" placeholder="DD/MM/YYYY" />
				</div>

                <div class="mb-4">
					<label class="label">Reason</label>
					<t-textarea v-model="leaveForm.reason" value="" aria-placeholder="Please write down your reason here" />
				</div>
                
                <pre>{{ leaveForm }}</pre>

				<t-button class="button is-info" @click="addNewItem">Add Item</t-button>
            </t-modal>

        </div>
        <calendar-view
            :items="items"
			:show-date="showDate"
            :disable-past="false"
            :starting-day-of-week="startingDayOfWeek"
            @click-date="onClickDay"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate" />
			</template>
		</calendar-view>
    </div>
</template>
<script>
    import Api from '../network/Api'
    import TModal from 'vue-tailwind/dist/t-modal'
    import { CalendarView, CalendarViewHeader} from "vue-simple-calendar"
	
    // import "../../node_modules/vue-simple-calendar/static/css/gcal.css"
    import "../assets/calendar.css"
    import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css"

export default {
    name: 'CalendarPage',
    data: function() {
        return { 
            showDate: new Date(),
            showLeaveModal: false,
            startingDayOfWeek: 1,
            leaveTypes: [],
            leaveForm: {
                startDate: '',
                endDate: '',
                reason: '',
                leaveType: '',
            },
            items: [
                {
					id: "e4",
					startDate: "2021-08-24",
					title: "Independence Day",
					classes: "red",
					url: "https://en.wikipedia.org/wiki/Birthday",
				},
                // {
				// 	id: "e5",
				// 	startDate: "2021-08-24",
				// 	title: "Testing",
				// 	classes: "purple",
				// 	url: "https://en.wikipedia.org/wiki/Birthday",
				// },
                // {
				// 	id: "e6",
				// 	startDate: "2021-08-24",
				// 	title: "Testing",
				// 	classes: "orange",
				// 	url: "https://en.wikipedia.org/wiki/Birthday",
				// },
            ],
            itemForm: {
                startDate: '',
                endDate: '',
                title: ''
            }
        }
    },
    components: {
        CalendarView,
        CalendarViewHeader,
        TModal
    },
    computed: {
		
	},
    mounted() {
        this.getLeaveTypes()
        this.getCalendarData()
    },
    methods: {
        setShowDate(d) {
            this.showDate = d;
        },
        getCalendarData(){
            Api.getCalendarData()
                .then(response => {
                    this.items = response.holidays.concat(response.leaves)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getLeaveTypes(){
            Api.getLeaveTypes()
                .then(response => {
                    this.leaveTypes = response
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onClickDay(d){
            console.log('Clicked day')
            console.log(d.toLocaleDateString())
            this.leaveForm.startDate = d.toLocaleDateString('en-GB')
            this.leaveForm.endDate = d.toLocaleDateString('en-GB')
            this.showLeaveModal = true
        },
        addNewItem() {
            Api.createLeave(this.leaveForm)
                .then(response => {
                    this.items.push(response)
                    //close modal
                    this.showModal = false
                })
                .catch(error => {
                    console.log(error)
                })
		},
    }
}
</script>
<style scoped>
.cv-wrapper, .cv-wrapper div {
    box-sizing: border-box;
    line-height: 1em;
    font-size: 12;
}
.theme-default .cv-day.today {
    background-color: #fdfd83!important;
}
</style>