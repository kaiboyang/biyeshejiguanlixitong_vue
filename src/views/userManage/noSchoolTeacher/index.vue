<style>
</style>
<template>
<div class="app-container">
    <el-button class="filter-item" style="margin-left: 10px;margin-bottom:10px" type="primary" icon="el-icon-edit" @click="createBase">
        添加校外老师
    </el-button>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="baseData" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="60">
            <template slot-scope="{$index}">
                <span>{{ $index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
            <template slot-scope="{row}">
                <span>{{ row.baseName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="手机">
            <template slot-scope="{row}">
                <span>{{ row.dirName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱">
            <template slot-scope="{row}">
                <span>{{ row.basePeopleName }}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户初始化" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="warning" size="mini" @click="reversePwd(row)">
                    重置密码
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
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

    <!-- 编辑基地模态框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="clickEditBase" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="老师ID" prop="title">
                <el-input v-model="clickEditBase.id" disabled />
            </el-form-item>
            <el-form-item label="姓名" prop="title">
                <el-input v-model="clickEditBase.baseName" />
            </el-form-item>
            <el-form-item label="手机" prop="title">
                <el-input v-model="clickEditBase.dirName" />
            </el-form-item>
            <el-form-item label="邮箱" prop="title">
                <el-input v-model="clickEditBase.basePeopleName" />
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
        <span>确认删除该老师？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteModel = false">取 消</el-button>
            <el-button type="primary" @click="deleteTrue()">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog title="提示" :visible.sync="reversePwdModel" width="30%">
        <span>确认重置该负责人的密码？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reversePwdModel = false">取 消</el-button>
            <el-button type="primary" @click="reversePwd()">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    getXwTeaList
} from '@/api/teachers'
export default {
    data() {
        return {
            // 模态框title
            textMap: {
                update: '编辑',
                create: '添加'
            },
            dialogStatus: '',
            reversePwdModel: false,
            dialogTableVisible: false,

            // 校外老师信息
            baseData: [],
            dialogFormVisible: false,
            deleteModel: false,
            listLoading: false,

            // 被点击编辑后的基地信息
            clickEditBase: {}
        }
    },
    methods: {
        createBase() {
            this.clickEditBase = {}
            this.dialogStatus = "create"

            this.dialogFormVisible = true
        },
        checkStudent(row) {
            this.dialogTableVisible = true
        },
        handleBase(row) {
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
        // 查找所有校外老师
        getXwTeaList() {
            getXwTeaList().then(response => {
                console.log(response.data.list)
                this.baseData = response.data.list
            })
        }
    },
    created() {
        this.getXwTeaList()
    }
}
</script>
