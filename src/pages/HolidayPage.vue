<template>
    <div class="mt-">
        <div class="my-8">
            <t-button @click="showHolidayFormModal=!showHolidayFormModal" type="button">Create New Holiday</t-button>
        </div>
        
        <t-modal v-model="showHolidayFormModal" header="Holiday Create Form">

            <div class="mb-4">
                <label class="label text-sm">Holiday Name</label>
                <t-input v-model="holidayForm.name" value="" placeholder="Holiday name" />
            </div>

            <div class="mb-4">
                <label class="label text-sm">Start date (eg. 2021-12-30)</label>
                <t-input v-model="holidayForm.start_date" value="" placeholder="YYYY-MM-DD" />
            </div>

            <div class="mb-4">
                <label class="label text-sm">End date (eg. 2021-12-30)</label>
                <t-input v-model="holidayForm.end_date" value="" placeholder="YYYY-MM-DD" />
            </div>

            <t-button class="button is-info" @click="createHoliday()">Create</t-button>
        </t-modal>
        <datatable
            title="Holidays"
            :columns="tableColumns"
            :rows="tableRows"
            :perPage="[10, 20, 30, 40, 50, 100]"
            :clickable="false"
            :sortable="false"
            :exactSearch="false"
            :searchable="false"
            :paginate="false"
            :exportable="false"
            :printable="false"
        >
            <th slot="thead-tr">
                Actions
            </th>
            <template slot="tbody-tr" scope="props">
                <td>
                    <button 
                        class="btn red darken-2 waves-effect waves-light compact-btn" 
                        @click="deleteItem(props.row)"
                    >
                        <i class="material-icons text-red-500">delete</i>
                    </button>
                </td>
            </template>
        >
        </datatable>
    </div>
</template>
<script>
    import Api from '../network/Api'
    import DataTable from "vue-materialize-datatable";
    import TModal from 'vue-tailwind/dist/t-modal'
    export default {
        name: 'HolidayPage',
        components: {
            'datatable':DataTable,
            TModal
        },
        data() {
            return {
                showHolidayFormModal: false,
                holidayForm: {
                    name: '',
                    start_date: '',
                    end_date: ''
                },
                tableColumns: [
                    {
                        label: "ID",
                        field: "id",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Holiday Title",
                        field: "name",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Start Date",
                        field: "start_date",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "End Date",
                        field: "end_date",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Created At",
                        field: "created_at",
                        numeric: false,
                        html: false
                    },
                ],
                tableRows: [],
            }
        },
        mounted(){
            this.fetchHolidayData()
        },
        methods: {
            clearFormData() {
                this.holidayForm = {
                    name: '',
                    start_date: '',
                    end_date: ''
                }
            },
            createHoliday(){
                Api.createHoliday(this.holidayForm)
                    .then(response => {
                        console.log(response)
                        //refresh list
                        this.fetchHolidayData()

                        this.showHolidayFormModal = false

                        this.clearFormData()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            deleteItem(holiday){
                console.log('A', holiday)
                Api.deleteHoliday(holiday.id)
                    .then(response => {
                        console.log(response)
                        //refresh list
                        this.fetchHolidayData()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            fetchHolidayData(){
                Api.getHolidays()
                    .then(response => {
                        this.tableRows = response
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>