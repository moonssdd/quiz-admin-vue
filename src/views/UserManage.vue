<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h2>用户管理</h2>
        <p>查看 Quiz 系统的注册用户与答题状态</p>
      </div>
      <el-input
        v-model="keyword"
        placeholder="搜索用户名或邮箱"
        prefix-icon="el-icon-search"
        clearable
        style="width: 260px"
      />
    </div>

    <el-card shadow="never" class="table-card">
      <el-table :data="filteredUsers" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="name" label="用户名" width="160" />
        <el-table-column prop="email" label="邮箱" min-width="220" show-overflow-tooltip />
        <el-table-column label="角色" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.role === 'admin' ? 'warning' : 'info'" size="small">
              {{ scope.row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="答题数" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.quizCount }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.active ? 'success' : 'danger'" size="small">
              {{ scope.row.active ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              :style="{ color: scope.row.active ? '#f56c6c' : '#67c23a' }"
              @click="toggleUser(scope.row)"
            >
              {{ scope.row.active ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data() {
    return {
      keyword: '',
      users: [
        { id: 1, name: 'moonssdd', email: 'moonssdd@example.com', role: 'admin', quizCount: 12, active: true },
        { id: 2, name: 'zhangsan', email: 'zhangsan@example.com', role: 'user', quizCount: 28, active: true },
        { id: 3, name: 'lisi', email: 'lisi@example.com', role: 'user', quizCount: 15, active: true },
        { id: 4, name: 'wangwu', email: 'wangwu@example.com', role: 'user', quizCount: 9, active: false },
        { id: 5, name: 'zhaoliu', email: 'zhaoliu@example.com', role: 'user', quizCount: 34, active: true },
        { id: 6, name: 'chenqi', email: 'chenqi@example.com', role: 'user', quizCount: 7, active: true },
        { id: 7, name: 'sunba', email: 'sunba@example.com', role: 'user', quizCount: 19, active: true },
        { id: 8, name: 'zhoujiu', email: 'zhoujiu@example.com', role: 'user', quizCount: 0, active: false }
      ]
    }
  },
  computed: {
    filteredUsers() {
      const kw = this.keyword.trim().toLowerCase()
      if (!kw) return this.users
      return this.users.filter(
        u => u.name.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw)
      )
    }
  },
  methods: {
    toggleUser(row) {
      row.active = !row.active
      this.$message.success(`${row.name} 已${row.active ? '启用' : '禁用'}`)
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
  flex-wrap: wrap;
  gap: 16px;
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