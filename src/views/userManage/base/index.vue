<style>
</style>
<template>
<div class="app-container" v-loading="listLoading">
    <el-button class="filter-item" style="margin-left: 10px;margin-bottom:10px" type="primary" icon="el-icon-edit" @click="createBaseModel">
        添加基地
    </el-button>
    <el-button class="filter-item" style="margin-left: 10px;margin-bottom:10px" type="primary" icon="el-icon-edit" @click="createDirectModel">
        添加方向
    </el-button>
    <!-- 表格内容 -->
    <el-table :data="baseData" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="60">
            <template slot-scope="{$index}">
                <span>{{ $index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="基地名称">
            <template slot-scope="{row}">
                <span>{{ row.baseName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="方向名称">
            <template slot-scope="{row}">
                <span>{{ row.dirName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="基地负责人">
            <template slot-scope="{row}">
                <span>{{ row.teaName }}</span>
            </template>
        </el-table-column>
        <el-table-column label="学生信息" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="checkStudent(row)">
                    查看基地学生
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

    <!-- 查看基地学生信息模态框 -->
    <el-dialog title="学生信息" :visible.sync="dialogTableVisible">
        <el-table :data="studentData">
            <el-table-column property="id" label="学号" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="phone" label="电话"></el-table-column>
        </el-table>
    </el-dialog>

    <!--  编辑/添加 基地模态框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="clickEditBase" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
            <el-form-item label="基地ID" prop="title">
                <el-input v-model="clickEditBase.id" disabled />
            </el-form-item>
            <el-form-item :required="true" prop="baseName" label="基地名称">
                <el-input v-model="clickEditBase.baseName" />
            </el-form-item>
            <el-form-item label="方向名称" prop="title">
                <!-- 方向下拉框 -->
                <el-select v-model="dirId" placeholder="请选择">
                    <el-option v-for="item in directName" :key="item.id" :label="item.dirName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="负责人" prop="title">
                <!-- 负责人下拉框 -->
                <el-select v-model="teaId" placeholder="请选择">
                    <el-option v-for="item in teachers" :key="item.id" :label="item.teaName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
                取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createBase():updateBase()">
                确认
            </el-button>
        </div>
    </el-dialog>

    <!-- 删除按钮 -->
    <el-dialog title="提示" :visible.sync="deleteModel" width="30%">
        <span>确认删除该基地信息？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteModel = false">取 消</el-button>
            <el-button type="primary" @click="deleteTrue()">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加方向-->
    <el-dialog title="添加方向" :visible.sync="directModel" width="30%">
        <el-input :required="true" v-model="createDirectName" placeholder="请输入方向名称"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="directModel = false">
                取消
            </el-button>
            <el-button type="primary" @click="creatdDirect()">
                创建
            </el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import {
    getBase,
    getTeacher,
    updadteBase,
    getDirect,
    deleteBase,
    createBase,
    addDirect,
} from '@/api/userManage'
export default {
    data() {
        return {
            createDirectName: '',
            // 为了获取两个下拉框的id而创建
            dirId: '',
            teaId: '',
            //
            teachers: [],
            directName: [],
            // 模态框title
            textMap: {
                update: '编辑',
                create: '添加基地'
            },
            dialogStatus: '',

            // 学生信息
            studentData: [{
                    id: '18130041642',
                    name: '杨凯博',
                    phone: '19834047973'
                },
                {
                    id: '18130041642',
                    name: '杨凯博',
                    phone: '19834047973'
                }
            ],
            dialogTableVisible: false,

            // 基地信息
            baseData: [],
            dialogFormVisible: false,
            deleteModel: false,
            listLoading: false,

            // 被点击编辑后的基地信息
            clickEditBase: {

            },
            directModel: false
        }
    },
    methods: {
        // 添加方向模态框启动
        createDirectModel() {
            this.createDirectName = ''
            this.directModel = true;
        },
        creatdDirect() {
            var that = this
            console.log(this.createDirectName)
            if (this.createDirectName != '') {
                addDirect(this.createDirectName).then(response => {
                    if (response.success) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    that.directModel = false
                })
            } else {
                this.$message({
                    message: '请输入名称',
                    type: 'error'
                });
            }

        },
        // 开启创建基地模态框
        createBaseModel() {
            // 把所有属性弄成空
            this.clickEditBase = {}
            this.dirId = ''
            this.teaId = ''
            // 
            this.dialogStatus = "create"
            this.dialogFormVisible = true
            this.getDirTeaList()
        },
        // 点击创建基地
        createBase() {
            this.clickEditBase.dirId = this.dirId
            this.clickEditBase.teaId = this.teaId
            console.log("this.clickEditBase", this.clickEditBase.baseName)
            if (this.clickEditBase.baseName) {
                createBase(this.clickEditBase).then(response => {
                    if (response.success) {
                        this.getBase()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                    }
                })
            } else {
                this.$message({
                    message: '请输入名称',
                    type: 'error'
                });
            }

        },
        // 更新基地
        updateBase() {
            this.clickEditBase.dirId = this.dirId
            this.clickEditBase.teaId = this.teaId
            var that = this
            updadteBase(this.clickEditBase).then(response => {
                if (response.success) {
                    that.getBase()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.dialogFormVisible = false
                }
            })
        },

        checkStudent(row) {
            this.dialogTableVisible = true
        },
        // 获取 方向列表 和 负责人列表
        getDirTeaList() {
            getDirect().then(response => {
                console.log(response)
                this.directName = response.data.list
            })
            getTeacher().then(response => {
                console.log(response)
                this.teachers = response.data.list
            })
        },
        handleBase(row) {
            this.getDirTeaList()
            this.dialogStatus = "update"
            this.clickEditBase = Object.assign({}, row)
            this.dirId = this.clickEditBase.dirId
            this.teaId = this.clickEditBase.teaId
            this.dialogFormVisible = true
        },
        deleteBase(row) {
            this.clickEditBase = Object.assign({}, row)
            this.deleteModel = true
        },
        //确认删除
        deleteTrue() {
            deleteBase(this.clickEditBase.id).then(response => {
                if (response.success) {
                    this.getBase()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.deleteModel = false
                }
            })
        },
        // 获取基地数据
        getBase() {
            this.listLoading = true
            getBase().then(response => {
                console.log(response.data.data)
                this.baseData = response.data.data
                this.listLoading = false
            })
        }
    },
    created() {
        this.getBase()
    },
}
</script>
