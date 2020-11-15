<style scoped>
.drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
}

.upload-title {
    width: 600px;
    margin: 20px 0;
}
</style>
<template>
<div>
    <div style="width:100%;text-align:center">
        <el-input class="upload-title" v-model="uploadFile.title" placeholder="请输入题目"></el-input>
    </div>
    <el-upload accept=".docx" :on-exceed="handleExceed" :limit="1" :on-success="uploadTrue" class="drop" ref="upload" action="http://192.168.43.228:9000/api/oss/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
</div>
</template>

<script>
import {
    uploadTopic
} from '@/api/file'
import {
    Message
} from 'element-ui';
export default {
    data() {
        return {
            fileList: [],
            uploadFile: {}
        };
    },
    methods: {
        uploadTrue(response) {
            this.uploadFile.url = response.data.url
            console.log(this.uploadFile)
            uploadTopic(this.uploadFile).then(response => {
                if (response.success) {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.uploadFile.title = ''
                } else {
                    this.$message({
                        message: '上传失败，请重试',
                        type: 'error'
                    });
                }
            })
        },
        submitUpload() {
            if (this.uploadFile.title) {
                this.$refs.upload.submit();
            } else {
                this.$message({
                    message: '请输入题目名称',
                    type: 'error'
                });
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed() {
            this.$message({
                message: '只能上传一个文件',
                type: 'error'
            });
        }
    }
}
</script>
