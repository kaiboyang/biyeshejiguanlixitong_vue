<!--<iframe src='https://view.officeapps.live.com/op/view.aspx?src=https://wenku.baidu.com/view/2eb27c795afb770bf78a6529647d27284a73370b.html' style="border:0px;overflow: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%"></iframe>-->

<style>
</style>
<template>
<div class="app-container">
    <el-button class="filter-item" style="margin-left: 10px;margin-bottom:10px" type="primary" @click="accessPlus">
        一键通过
    </el-button>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="baseData" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="60">
            <template slot-scope="{$index}">
                <span>{{ $index+1 }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
            <template slot-scope="{row}">
                <span>{{ row.topicTime }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="题目">
            <template slot-scope="{row}">
                <span>{{ row.topicName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="作者">
            <template slot-scope="{row}">
                <span>{{ row.topicAuthor }}</span>
            </template>
        </el-table-column>
        <el-table-column width="230" label="查看" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="seeTopic(row)" icon="el-icon-view">
                    预览
                </el-button>
                <el-button type="primary" size="mini" @click="downloadTopic(row)" icon="el-icon-download">
                    下载
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button v-if="row.status" round type="success" size="mini" @click="handleTopic(row)">
                    通过
                </el-button>
                <el-button v-if="!row.status" round type="warning" size="mini" @click="handleTopic(row)">
                    取消
                </el-button>
                <el-button size="mini" type="danger" @click="deleteBase(row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 删除按钮 -->
    <el-dialog title="提示" :visible.sync="deleteModel" width="30%">
        <span>确认删除该题目？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteModel = false">取 消</el-button>
            <el-button type="primary" @click="deleteTrue()">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 一键通过 -->
    <el-dialog title="提示" :visible.sync="accessPlusModel" width="30%">
        <span>确认一键通过？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="accessPlusModel = false">取 消</el-button>
            <el-button type="primary" @click="accessPlus()">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            // 基地信息
            baseData: [{
                id: 1,
                topicTime: '1992-06-23 09:32',
                topicName: '图书管理系统',
                topicAuthor: '洪军',
                status: true
            }, {
                id: 2,
                topicTime: '1993-06-23 09:32',
                topicName: '宿舍管理系统',
                topicAuthor: '洪军',
                status: false
            }],
            deleteModel: false,
            accessPlusModel: false,
            listLoading: false,

            // 被点击编辑后的基地信息
            clickEditBase: {}
        }
    },
    methods: {
        accessPlus() {
            this.accessPlusModel = true
        },
        seeTopic(row) {
            console.log("查看")
        },
        downloadTopic() {
            console.log("下载")
        },
        //处理论文通过或取消
        handleTopic(row) {
            // 弹框
            this.$message({
                message: '操作成功',
                type: 'success'
            })
            // 将标签进行变化
            row.status = !row.status
        },

        // 删除操作
        deleteBase(row) {
            this.clickEditBase = row
            this.deleteModel = true
        },
        //确认删除
        deleteTrue() {
            console.log(this.clickEditBase.id)
        }
    },
}
</script>
