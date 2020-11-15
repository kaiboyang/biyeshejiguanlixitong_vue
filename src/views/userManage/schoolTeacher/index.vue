<style>
</style>
<template>
<div class="app-container" v-loading="listLoading">
    <el-button class="filter-item" style="margin-left: 10px;margin-bottom:10px" type="primary" icon="el-icon-edit" @click="createBase">
        添加校内老师
    </el-button>
    <!-- 表格内容 -->
    <el-table :data="baseData" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="60">
            <template slot-scope="{$index}">
                <span>{{ $index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="工号">
            <template slot-scope="{row}">
                <span>{{ row.teaNumber }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
            <template slot-scope="{row}">
                <span>{{ row.teaName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="手机">
            <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱">
            <template slot-scope="{row}">
                <span>{{ row.email }}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户初始化" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="warning" size="mini" @click="reversePwdModel(row)">
                    重置密码
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleBase(row)">
                    编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 编辑基地模态框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="clickEditBase" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
            <el-form-item :required="true" label="老师工号" prop="teaNumber">
                <el-input v-model="clickEditBase.teaNumber" :disabled="dialogStatus=='create'?false:true" />
            </el-form-item>
            <el-form-item :required="true" label="姓名" prop="teaName">
                <el-input v-model="clickEditBase.teaName" />
            </el-form-item>
            <el-form-item :required="true" label="手机" prop="phone">
                <el-input v-model="clickEditBase.phone" />
            </el-form-item>
            <el-form-item label="邮箱" prop="title">
                <el-input v-model="clickEditBase.email" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
                取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateTeaMessage()">
                确认
            </el-button>
        </div>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog title="提示" :visible.sync="reversePwdMode" width="30%">
        <span>确认重置该负责人的密码？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reversePwdMode = false">取 消</el-button>
            <el-button type="primary" @click="resetPasswordM()">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    resetPasswordQq,
    updateTeaMessage,
    addBaseteacher
} from '@/api/userManage'
import {
    getXnTeaList
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
            reversePwdMode: false,
            dialogTableVisible: false,

            // 基地信息
            baseData: [{
                id: 1,
                baseName: '杨凯博',
                dirName: '19834047973',
                basePeopleName: '1831255794@qq.com',
            }, {
                id: 2,
                baseName: '杨凯博',
                dirName: '19834047973',
                basePeopleName: '1831255794@qq.com',
            }],
            dialogFormVisible: false,
            deleteModel: false,
            listLoading: false,

            // 被点击编辑后的信息
            clickEditBase: {}
        }
    },
    methods: {
        createBase() {
            this.clickEditBase = {}
            this.dialogStatus = "create"
            this.dialogFormVisible = true
        },
        // 创建老师
        createData() {
            if (this.clickEditBase.teaNumber && this.clickEditBase.teaNumber && this.clickEditBase.phone) {
                this.clickEditBase.roles = [{
                    id: '3'
                }]
                addBaseteacher(this.clickEditBase).then(response => {
                    if (response.success) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    this.getXnTeaList()
                    this.dialogFormVisible = false
                })
            } else {
                this.$message({
                    message: '请完善工号、姓名、手机',
                    type: 'error'
                });
            }

        },
        checkStudent(row) {
            this.dialogTableVisible = true
        },
        handleBase(row) {
            this.clickEditBase = Object.assign({}, row)
            this.dialogStatus = "update"
            this.dialogFormVisible = true
        },
        // 修改信息
        updateTeaMessage() {
            console.log(this.clickEditBase)
            updateTeaMessage(this.clickEditBase).then(response => {
                if (response.success) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getXnTeaList()
                }
                this.dialogFormVisible = false
            })
        },

        //重置密码模态框
        reversePwdModel(row) {
            console.log(row)
            this.clickEditBase = Object.assign({}, row)
            this.reversePwdMode = true
        },
        //重置密码
        resetPasswordM() {
            console.log(this.clickEditBase.teaId)
            resetPasswordQq(this.clickEditBase.teaId).then(response => {
                console.log(response)
                if (response.success) {
                    this.$message({
                        message: '重置成功(默认密码为123456)',
                        type: 'success'
                    });
                }
                this.reversePwdMode = false
            })
        },
        // 查看校内老师
        getXnTeaList() {
            this.listLoading = true
            getXnTeaList().then(response => {
                console.log(response.data.list)
                this.baseData = response.data.list
                this.listLoading = false
            })
        }
    },
    created() {
        this.getXnTeaList()
    }
}
</script>
