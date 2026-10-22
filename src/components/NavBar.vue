<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="brand">
        <span class="brand-dot"></span>
        <span class="brand-name">Quiz 管理后台</span>
      </div>
      <nav class="nav-links">
        <router-link to="/questions" class="nav-item" active-class="active">
          题目管理
        </router-link>
        <router-link to="/users" class="nav-item" active-class="active">
          用户管理
        </router-link>
      </nav>
      <div class="user-area">
        <span class="user-name">moonssdd</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.15);
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2d3d;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-item {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #606266;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.nav-item:hover {
  background: #f0f2f5;
  color: #409eff;
}

.nav-item.active {
  background: #ecf5ff;
  color: #409eff;
}

.user-area {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #909399;
  background: #f4f4f5;
  padding: 4px 12px;
  border-radius: 999px;
}
</style>