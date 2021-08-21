<template>
    <div class="mt-">
        <div class="my-8">
            <t-button @click="showLeaveTypeFormModal=!showLeaveTypeFormModal" type="button">Create New Leave Type</t-button>
        </div>
        
        <t-modal v-model="showLeaveTypeFormModal" header="LeaveType Create Form">

            <div class="mb-4">
                <label class="label">Name</label>
                <t-input v-model="form.name" value="" placeholder="LeaveType name" />
            </div>

            <div class="mb-4">
                <label class="label">Description</label>
                <t-input v-model="form.description" value="" placeholder="Description" />
            </div>

            <div class="mb-4">
                <label class="label">Days per year</label>
                <t-input v-model="form.days_per_year" value="" placeholder="10" />
            </div>

            <button
                v-if="loading"
                class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-gray-600 focus:bg-gray-700 cursor-wait"
                type="button">Loading...
            </button>
            <button
                v-else
                @click="createLeaveType()"
                class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="button"
            >
            Submit
            </button>
        </t-modal>
        <datatable
            title="LeaveTypes"
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
        name: 'LeaveTypePage',
        components: {
            'datatable':DataTable,
            TModal
        },
        data() {
            return {
                loading: false,
                showLeaveTypeFormModal: false,
                form: {
                    name: '',
                    description: '',
                    days_per_year: ''
                },
                tableColumns: [
                    {
                        label: "ID",
                        field: "id",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Title",
                        field: "text",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Description",
                        field: "description",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Days Per Year",
                        field: "days_per_year",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Created At",
                        field: "created_at",
                        numeric: false,
                        html: false
                    }
                ],
                tableRows: [],
            }
        },
        mounted(){
            this.fetchLeaveTypeData()
        },
        methods: {
            clearFormData() {
                this.form = {
                    name: '',
                    description: '',
                    days_per_year: ''
                }
            },
            createLeaveType(){
                this.loading = true
                Api.createLeaveType(this.form)
                    // eslint-disable-next-line no-unused-vars
                    .then(response => {
                        this.loading = false
                        //refresh list
                        this.fetchLeaveTypeData()

                        this.showLeaveTypeFormModal = false

                        this.clearFormData()
                    })
                    .catch(error => {
                        this.loading = false
                        console.log(error)
                    })
            },
            deleteItem(LeaveType){
                console.log('A', LeaveType)
                Api.deleteLeaveType(LeaveType.id)
                    .then(response => {
                        console.log(response)
                        //refresh list
                        this.fetchLeaveTypeData()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            fetchLeaveTypeData(){
                Api.getLeaveTypes()
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