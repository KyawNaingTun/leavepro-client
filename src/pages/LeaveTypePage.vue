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

            <t-button class="button is-info" @click="createLeaveType">Create</t-button>
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
                console.log('submit')
                Api.createLeaveType(this.form)
                    .then(response => {
                        console.log(response)
                        //refresh list
                        this.fetchLeaveTypeData()

                        this.showLeaveTypeFormModal = false

                        this.clearFormData()
                    })
                    .catch(error => {
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