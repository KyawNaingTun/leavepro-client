<template>
    <div class="mt-">
        <datatable
            title="Leave Reports"
            :columns="tableColumns"
            :rows="tableRows"
            :perPage="[10, 20, 30, 40, 50, 100]"
        />
    </div>
</template>
<script>
    import Api from '../network/Api'
    import DataTable from "vue-materialize-datatable";
    export default {
        name: 'ReportPage',
        components: {
            'datatable':DataTable
        },
        data() {
            return {
                tableColumns: [
                    {
                        label: "ID",
                        field: "id",
                        numeric: true,
                        html: false
                    },
                    {
                        label: "Employee Name",
                        field: "employee_name",
                        numeric: false,
                        html: false
                    },
                    {
                        label: "Leave Type",
                        field: "leave_type_name",
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
                        label: "Reason",
                        field: "reason",
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
            this.fetchReportData()
        },
        methods: {
            fetchReportData(){
                Api.getLeaveReport()
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