<style>
.searchList {
    margin: 5px 0;
}

.searchList-item {
    margin-right: 3px;
}
</style>
<template>
<div class="app-container">
    <el-button type="primary" icon="el-icon-edit" @click="createBase">
        添加学生
    </el-button>
    <br>
    <div class="searchList">
        <el-input v-model="listQuery.stuNumber" placeholder="学号" style="width: 150px;" class="searchList-item" @keyup.enter.native="handleFilter" />
        <el-input v-model="listQuery.stuName" placeholder="姓名" style="width: 150px;" class="searchList-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.direct" placeholder="方向" clearable class="searchList-item" style="width: 130px">
            <el-option v-for="item in directName" :key="item.id" :label="item.dirName" :value="item.id" />
        </el-select>
        <el-select v-model="listQuery.classNum" placeholder="班级" clearable class="searchList-item" style="width: 130px">
            <el-option v-for="item in stuClass" :key="item.id" :label="item.classNumber" :value="item.id" />
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查找
        </el-button>
    </div>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="baseData" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="50">
            <template slot-scope="{$index}">
                <span>{{ $index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="学号">
            <template slot-scope="{row}">
                <span>{{ row.stuId }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
            <template slot-scope="{row}">
                <span>{{ row.stuName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="手机">
            <template slot-scope="{row}">
                <span>{{ row.stuPhone }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱">
            <template slot-scope="{row}">
                <span>{{ row.stuEmail }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="班级">
            <template slot-scope="{row}">
                <span>{{ row.classNumber }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="方向">
            <template slot-scope="{row}">
                <span>{{ row.dirName }}</span>
            </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="选题情况">
            <template slot-scope="{row}">
                <el-tag :type="row.topId!=null?'success':'danger'">
                    {{ row.topId!=null?'已选':'未选' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="用户初始化" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="warning" size="mini" @click="reversePwd(row)">
                    重置密码
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleBase(row)">
                    编辑
                </el-button>
                <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="deleteBase(row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="100" />

    <!-- 编辑基地模态框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="clickEditBase" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="学号" prop="title">
                <el-input v-model="clickEditBase.stuId" :disabled="idDisable" />
            </el-form-item>
            <el-form-item label="姓名" prop="title">
                <el-input v-model="clickEditBase.stuName" />
            </el-form-item>
            <el-form-item label="手机" prop="title">
                <el-input v-model="clickEditBase.stuPhone" />
            </el-form-item>
            <el-form-item label="邮箱" prop="title">
                <el-input v-model="clickEditBase.stuEmail" />
            </el-form-item>
            <el-form-item label="班级" prop="title">
                <el-input v-model="clickEditBase.classNumber" />
            </el-form-item>
            <el-form-item label="方向" prop="title">
                <el-input v-model="clickEditBase.dirName" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
                取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                确认
            </el-button>
        </div>
    </el-dialog>

    <!-- 删除按钮 -->
    <el-dialog title="提示" :visible.sync="deleteModel" width="30%">
        <span>确认删除该学生？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteModel = false">取 消</el-button>
            <el-button type="primary" @click="deleteTrue()">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog title="提示" :visible.sync="reversePwdModel" width="30%">
        <span>确认重置该学生密码？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reversePwdModel = false">取 消</el-button>
            <el-button type="primary" @click="reversePwd()">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    getStudents
} from '@/api/students'
import {
    getClass,
    getDirect
} from '@/api/userManage'
export default {
    data() {
        return {
            listQuery: {},
            // 学生和老师列表
            directName: [],
            stuClass: [],
            idDisable: true,
            // 模态框title
            textMap: {
                update: '编辑',
                create: '添加'
            },
            dialogStatus: '',
            reversePwdModel: false,
            dialogTableVisible: false,

            // 基地信息
            baseData: [],
            dialogFormVisible: false,
            deleteModel: false,
            listLoading: false,

            // 被点击编辑后的基地信息
            clickEditBase: {}
        }
    },
    methods: {
        // 处理查找
        handleFilter() {
            console.log("发请求")
            console.log(this.listQuery)
        },
        createBase() {
            this.idDisable = false
            this.clickEditBase = {}
            this.dialogStatus = "create"

            this.dialogFormVisible = true
        },
        checkStudent(row) {
            this.dialogTableVisible = true
        },
        handleBase(row) {
            this.idDisable = true
            this.dialogStatus = "update"
            this.clickEditBase = Object.assign({}, row)
            this.dialogFormVisible = true
        },
        deleteBase(row) {
            this.clickEditBase = Object.assign({}, row)
            this.deleteModel = true
        },
        //确认删除
        deleteTrue() {
            console.log(this.clickEditBase.id)
        },
        //重置
        reversePwd() {
            this.reversePwdModel = true
        },
        // 获取学生信息
        getStudents() {
            getStudents().then(response => {
                console.log(response.data)
                this.baseData = response.data.list
            })
        },
        // 获取 方向列表 和 负责人列表
        getDirTeaList() {
            getDirect().then(response => {
                console.log("getDirect", response)
                this.directName = response.data.list
            })
            getClass().then(response => {
                console.log("getClass", response)
                this.stuClass = response.data.list
            })
        },
    },

    created() {
        this.getStudents()
        this.getDirTeaList()
    }
}
</script>
