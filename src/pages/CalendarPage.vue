<template>
    <div>
        <div class="mt-10">
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

				<t-button class="button is-info" @click="addNewLeave">Submit</t-button>
            </t-modal>

        </div>
        <full-calendar :config="calendarConfig" :events="calendarEvents" @day-click="dateClick"></full-calendar>
    </div>
</template>
<script>
    import Api from '../network/Api'
    import TModal from 'vue-tailwind/dist/t-modal'
    import { FullCalendar } from 'vue-full-calendar'

export default {
    name: 'CalendarPage',
    components: {
        FullCalendar,
        TModal
    },
    data: function() {
        return { 
            showDate: new Date(),
            showLeaveModal: false,
            startingDayOfWeek: 1,
            leaveTypes: [],
            calendarConfig: {
                defaultView: 'month',
                weekends: true,
                firstDay: 1
            },
            leaveForm: {
                startDate: '',
                endDate: '',
                reason: '',
                leaveType: '',
            },
            calendarEvents: []
        }
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
                    // eslint-disable-next-line no-unused-vars
                    var leaves = response.leaves.map((el, i)=>{
                        return {
                                allDay: true,
                                textColor: "white", 
                                title : `#${el.id} ${el.employee_name}(${el.leave_type_name})`, 
                                start: el.start_date.substring(0,10),//new Date(el.start_date.substring(0,10)), 
                                end: el.end_date.substring(0,10),//new Date(el.end_date.substring(0,10))
                            }
                        }
                    );
                    var holidays = response.holidays.map((el, i)=>{
                        console.log(i)
                        return {
                                allDay: true,
                                textColor: "red",
                                borderColor: '#fca5a5',
                                backgroundColor: '#f3f4f6',
                                title : el.title, 
                                start: new Date(el.startDate), 
                                end: new Date(el.endDate)
                            }
                        }
                    );
                    this.calendarEvents = holidays.concat(leaves);
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
        dateClick(date){
            this.leaveForm.startDate = date.locale('en-GB').format('L')
            this.leaveForm.endDate = date.locale('en-GB').format('L')
            this.showLeaveModal = true
        },
        clearFormData() {
            this.leaveForm = {
                startDate: '',
                endDate: '',
                reason: '',
                leaveType: ''
            }
        },
        addNewLeave() {
            Api.createLeave(this.leaveForm)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    //refresh
                    this.getCalendarData()
                    //close modal
                    this.showLeaveModal = false
                    this.clearFormData()
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