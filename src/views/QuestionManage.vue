<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h2>题目管理</h2>
        <p>维护 Quiz 题库中的题目、选项与正确答案</p>
      </div>
      <el-button type="primary" icon="el-icon-plus" @click="openAddDialog">
        新增题目
      </el-button>
    </div>

    <el-card shadow="never" class="table-card">
      <el-table :data="questions" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="question" label="题目内容" min-width="260" show-overflow-tooltip />
        <el-table-column label="选项数量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.options.length }}</template>
        </el-table-column>
        <el-table-column label="正确答案" width="120">
          <template slot-scope="scope">
            <el-tag type="success" size="small">
              {{ correctLabel(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openEditDialog(scope.row)">
              编辑
            </el-button>
            <el-button type="text" size="small" style="color: #f56c6c" @click="removeQuestion(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="520px" @close="resetForm">
      <el-form :model="form" :rules="rules" ref="questionForm" label-width="90px">
        <el-form-item label="题目内容" prop="question">
          <el-input v-model="form.question" type="textarea" :rows="3" placeholder="请输入题目内容" />
        </el-form-item>
        <el-form-item
          v-for="(opt, index) in form.options"
          :key="index"
          :label="'选项 ' + optionLetter(index)"
        >
          <el-input v-model="form.options[index]" :placeholder="'请输入选项 ' + optionLetter(index)" />
        </el-form-item>
        <el-form-item label="正确答案" prop="answer">
          <el-select v-model="form.answer" placeholder="请选择正确答案" style="width: 100%">
            <el-option
              v-for="(opt, index) in form.options"
              :key="index"
              :label="optionLetter(index) + '. ' + opt"
              :value="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QuestionManage',
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      editId: null,
      form: {
        question: '',
        options: ['', '', '', ''],
        answer: 0
      },
      rules: {
        question: [{ required: true, message: '请输入题目内容', trigger: 'blur' }],
        answer: [{ required: true, message: '请选择正确答案', trigger: 'change' }]
      },
      questions: [
        {
          id: 1,
          question: 'HTML 的全称是什么？',
          options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Markup Language', 'Home Tool Markup Language'],
          answer: 0
        },
        {
          id: 2,
          question: 'CSS 中用于设置文字颜色的属性是？',
          options: ['font-color', 'text-color', 'color', 'font-style'],
          answer: 2
        },
        {
          id: 3,
          question: 'JavaScript 中声明常量的关键字是？',
          options: ['var', 'let', 'const', 'static'],
          answer: 2
        }
      ]
    }
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑题目' : '新增题目'
    }
  },
  methods: {
    optionLetter(index) {
      return String.fromCharCode(65 + index)
    },
    correctLabel(row) {
      return this.optionLetter(row.answer) + '. ' + (row.options[row.answer] || '')
    },
    openAddDialog() {
      this.isEdit = false
      this.editId = null
      this.form = { question: '', options: ['', '', '', ''], answer: 0 }
      this.dialogVisible = true
    },
    openEditDialog(row) {
      this.isEdit = true
      this.editId = row.id
      this.form = {
        question: row.question,
        options: [...row.options],
        answer: row.answer
      }
      this.dialogVisible = true
    },
    resetForm() {
      if (this.$refs.questionForm) {
        this.$refs.questionForm.resetFields()
      }
    },
    submitForm() {
      this.$refs.questionForm.validate(valid => {
        if (!valid) return
        if (this.form.options.some(o => !o.trim())) {
          this.$message.warning('请填写所有选项')
          return
        }
        if (this.isEdit) {
          const index = this.questions.findIndex(q => q.id === this.editId)
          if (index > -1) {
            this.questions.splice(index, 1, {
              id: this.editId,
              question: this.form.question,
              options: [...this.form.options],
              answer: this.form.answer
            })
          }
          this.$message.success('题目已更新')
        } else {
          const newId = this.questions.length ? Math.max(...this.questions.map(q => q.id)) + 1 : 1
          this.questions.push({
            id: newId,
            question: this.form.question,
            options: [...this.form.options],
            answer: this.form.answer
          })
          this.$message.success('题目已添加')
        }
        this.dialogVisible = false
      })
    },
    removeQuestion(row) {
      this.$confirm('确定删除这道题目吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.questions = this.questions.filter(q => q.id !== row.id)
        this.$message.success('题目已删除')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2d3d;
  margin-bottom: 6px;
}

.page-header p {
  font-size: 0.9rem;
  color: #909399;
}

.table-card {
  border-radius: 12px;
}
</style>