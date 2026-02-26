// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 左侧导航栏展开/收起功能
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const subNavs = document.querySelectorAll('.sub-nav');
    const navArrows = document.querySelectorAll('.nav-item a .float-right');
    
    collapseBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            // 当导航栏折叠时，隐藏所有二级导航栏并重置箭头方向
            subNavs.forEach(subNav => {
                subNav.style.maxHeight = '0';
            });
            navArrows.forEach(arrow => {
                arrow.classList.remove('fa-chevron-up');
                arrow.classList.add('fa-chevron-down');
            });
        } else {
            // 当导航栏展开时，不操作二级导航栏，保持其当前状态
        }
    });

    // 右侧功能导航栏点击滚动效果
    const functionNavItems = document.querySelectorAll('.function-nav-item a');
    const modules = document.querySelectorAll('.module');
    const subModules = document.querySelectorAll('.detection-submodule');
    
    functionNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有导航项的active类
            document.querySelectorAll('.function-nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 添加当前导航项的active类
            this.parentElement.classList.add('active');
            
            // 获取目标模块ID
            const targetId = this.getAttribute('href').substring(1);
            
            // 先尝试找到对应的子模块
            let targetElement = document.getElementById(targetId);
            
            // 如果找到的是子模块，滚动到该子模块
            if (targetElement && targetElement.classList.contains('detection-submodule')) {
                const functionContent = document.querySelector('.function-content');
                functionContent.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            } else {
                // 否则找到对应的主模块
                targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const functionContent = document.querySelector('.function-content');
                    functionContent.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 监听滚动，同步导航栏选中状态
    const functionContent = document.querySelector('.function-content');
    
    functionContent.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        
        // 首先检查子模块
        let found = false;
        subModules.forEach(subModule => {
            const subModuleTop = subModule.offsetTop;
            const subModuleHeight = subModule.offsetHeight;
            
            if (scrollTop >= subModuleTop - 100 && scrollTop < subModuleTop + subModuleHeight - 100) {
                const subModuleId = subModule.getAttribute('id');
                
                // 移除所有导航项的active类
                document.querySelectorAll('.function-nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // 添加对应导航项的active类
                const correspondingNavItem = document.querySelector(`.function-nav-item a[href="#${subModuleId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.parentElement.classList.add('active');
                }
                
                // 同时激活父级导航项
                const parentNavItem = correspondingNavItem.closest('.function-nav-item.sub-item').previousElementSibling;
                if (parentNavItem && !parentNavItem.classList.contains('sub-item')) {
                    parentNavItem.classList.add('active');
                }
                
                found = true;
            }
        });
        
        // 如果没有找到子模块，检查主模块
        if (!found) {
            modules.forEach(module => {
                const moduleTop = module.offsetTop;
                const moduleHeight = module.offsetHeight;
                
                if (scrollTop >= moduleTop - 100 && scrollTop < moduleTop + moduleHeight - 100) {
                    const moduleId = module.getAttribute('id');
                    
                    // 移除所有导航项的active类
                    document.querySelectorAll('.function-nav-item').forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    
                    // 添加对应导航项的active类
                    const correspondingNavItem = document.querySelector(`.function-nav-item a[href="#${moduleId}"]`);
                    if (correspondingNavItem) {
                        correspondingNavItem.parentElement.classList.add('active');
                    }
                }
            });
        }
    });

    // 左侧导航栏子菜单展开/收起功能
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const subNav = item.querySelector('.sub-nav');
        
        if (subNav) {
            // 直接为链接添加点击事件，确保在任何状态下都能点击
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // 切换整个二级导航栏的显示/隐藏
                if (subNav.style.maxHeight) {
                    subNav.style.maxHeight = '0';
                    // 切换箭头方向为向下
                    const arrow = this.querySelector('.float-right');
                    if (arrow) {
                        arrow.classList.remove('fa-chevron-up');
                        arrow.classList.add('fa-chevron-down');
                    }
                } else {
                    subNav.style.maxHeight = subNav.scrollHeight + 'px';
                    // 切换箭头方向为向上
                    const arrow = this.querySelector('.float-right');
                    if (arrow) {
                        arrow.classList.remove('fa-chevron-down');
                        arrow.classList.add('fa-chevron-up');
                    }
                }
            });
            
            // 为箭头图标也添加点击事件，确保在折叠状态下点击箭头也能触发
            const arrow = link.querySelector('.float-right');
            if (arrow) {
                arrow.addEventListener('click', function(e) {
                    e.stopPropagation();
                    link.click();
                });
            }
        }
    });

    // 响应式菜单切换（移动端）
    const mainHeader = document.querySelector('.main-header');
    
    mainHeader.addEventListener('click', function(e) {
        if (e.target === mainHeader || e.target === mainHeader.querySelector('::before')) {
            sidebar.classList.toggle('open');
        }
    });

    // 初始化子菜单状态
    const activeSubNavItem = document.querySelector('.sub-nav-item.active');
    if (activeSubNavItem) {
        const subNav = activeSubNavItem.closest('.sub-nav');
        if (subNav) {
            subNav.style.maxHeight = subNav.scrollHeight + 'px';
            const arrow = subNav.previousElementSibling.querySelector('.float-right');
            if (arrow) {
                arrow.classList.remove('fa-chevron-down');
                arrow.classList.add('fa-chevron-up');
            }
        }
    }

    // 为"查看邮件原文"链接添加点击事件
    const viewEmailLink = document.querySelector('.text-link');
    if (viewEmailLink) {
        viewEmailLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 找到邮件原文模块
            const emailContentModule = document.getElementById('email-content');
            if (emailContentModule) {
                // 找到功能内容区域
                const functionContent = document.querySelector('.function-content');
                // 滚动到邮件原文模块，顶格显示
                functionContent.scrollTo({
                    top: emailContentModule.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // 同步更新右侧功能导航栏的选中状态
                document.querySelectorAll('.function-nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                const correspondingNavItem = document.querySelector('.function-nav-item a[href="#email-content"]');
                if (correspondingNavItem) {
                    correspondingNavItem.parentElement.classList.add('active');
                }
            }
        });
    }

    // 为"展开"链接添加交互效果
    const expandLinks = document.querySelectorAll('.text-link');
    expandLinks.forEach(link => {
        if (link.textContent.trim() === '展开') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tdElement = this.closest('td');
                if (tdElement) {
                    // 保存原始内容
                    if (!tdElement.dataset.originalContent) {
                        tdElement.dataset.originalContent = tdElement.innerHTML;
                    }
                    
                    // 切换展开/关闭状态
                    if (this.textContent.trim() === '展开') {
                        // 展开状态
                        this.textContent = '关闭';
                        tdElement.innerHTML = 'Received: from [77.83.39.151] (unknown [77.83.39.151]) <br> by ucloud-mxproxy-10 (Coremail) with SMTP id AQAAfwAX_wpfR55p2HmQAA--.4203S2; <br> Wed, 25 Feb 2026 08:50:42 +0800 (CST) <br> Reply-To: DSCS Engineering Production Support <goodnesslog@onionmail.org> <br> From: DSCS Engineering Production Support <DSCS.Eng.PS@damen.com> <br> To: support@coremail.cn <br> Subject: ***TOP URGENT***SEA LADY - New Inquiry <br> Date: 24 Feb 2026 16:50:39 -0800 <br> Message-ID: <20260224165038.56B05BD5F3EEF3F1@damen.com> <br> MIME-Version: 1.0 <br> Content-Type: multipart/mixed; <br> boundary="----=_NextPart_000_0012_632C9204.A4B72732" <br> X-CM-TRANSID:AQAAfwAX_wpfR55p2HmQAA--.4203S2 <br> Authentication-Results: ucloud-mxproxy-10; spf=softfail smtp.mail=dscs <br> .eng.ps@damen.com; <br> X-Coremail-Antispam: 1Uk129KBjDUn29KB7ZKAUJUUUUU529EdanIXcx71UUUUU7KY7 <br> ZEXasCq-sGcSsGvfJ3ic02F40ExcI2r2IE04Ijxs4l7I0Y64k_MxkFs20EY4vEb40E4x80 <br> F7AE7VAK0I1lc2IjII80xcxEwVAKI48JYxn0WfASr-VFAUDa7-sFnT9fnUUIcSsGvfJTRU <br> UUbGxYFVCjjxCrM7AC8VAFwI0_Jr0_Gr1l1IIY67AEw4v_Jr0_Jr4l8cAvFVAK0II2c7xJ <br> M28CjxkF64kEwVA0rcxSw2x7M28EF7xvwVC0I7IYx2IY67AKxVW8JVW5JwA2z4x0Y4vE2I <br> x0cI8IcVCY1x0267AKxVW8JVWxJwA2z4x0Y4vEx4A2jsIE14v26r4UJVWxJr1l84ACjcxK <br> 6I8E87Iv6xkF7I0E14v26r4UJVWxJr1le2I262IYc4CY6c8Ij28IcVAaY2xG8wASzI0EjI <br> 02j7AqF2xKxwAq048E620vw7xCY7CE4x8GYI0EYx1l5I8CrVC2YI8G0VAIFx02awAv7VC0 <br> I7IYx2IY67AKxVW3AVW8Xw1lYx0Ec7CjxVAajcxG14v26r1j6r4UMcIj6I8E87Iv67AKxV <br> WYoVW2owAm72CE4IkC6x0Yz7v_Jr0_Gr1lw4CE7480Y4vE14AKx2xKxVC2ax8xMx02cVAK <br> zwCY1x026xCI17CEII8vrVWkCVWkKwCY1Ik26cxK67kG6xCjj4xFzx0Ew2I7MxkI7II2jI <br> 8vz4vEwIxGrwCYIxAIcVC0I7IYx2IY67AKxVW8JVW5JwCYIxAIcVC0I7IYx2IY6xkF7I0E <br> 14v26r4j6F4UMxvI42IY6I8E87Iv67AKxVW8Jr0_Cr1UMxvI42IY6I8E87Iv6xkF7I0E14 <br> v26r4UJVWxJr1l4c8EcI0En4kS14v26rWY6Fy7MxAqzxv26xkF7I0En4kS14v26rWY6Fy7 <br> MxCjnVCFn7xvrwCFx2IqxVCFs4IE7xkEbVWUJVW8JwCFI7km07C267AKxVWrXVW3AwC20s <br> 026c02F40E14v26r106r1rMI8I3I0E7480Y4vE14v26r1j6r18MI8E67AF67kF1VAFwI0_ <br> Jr0_JrylIxAIcVCF04k26cxKx2IYs7xG6r1j6r1xYxBIdaVFxhVjvjDU0xZFpf9x07b3PE <br> fUUUUU= <br> <a href="#" class="text-link">关闭</a>';
                    } else {
                        // 关闭状态
                        this.textContent = '展开';
                        tdElement.innerHTML = tdElement.dataset.originalContent;
                    }
                }
            });
        }
    });

    // 为返回按钮添加点击事件
    const returnBtn = document.querySelector('.return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            window.location.href = 'delivery-log.html';
        });
    }

    // 为导出按钮添加点击事件
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // 这里可以添加导出功能的实现
            alert('导出功能已触发');
        });
    }

    // 初始化搜索模式，默认显示普通搜索模式
    const normalSearch = document.querySelector('.normal-search');
    const advancedSearch = document.querySelector('.advanced-search');
    if (normalSearch && advancedSearch) {
        normalSearch.style.display = 'block';
        advancedSearch.style.display = 'none';
    }

    // 为高级搜索模式切换按钮添加点击事件
    const advancedBtns = document.querySelectorAll('.advanced-btn');
    advancedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const normalSearch = document.querySelector('.normal-search');
            const advancedSearch = document.querySelector('.advanced-search');
            
            if (normalSearch && advancedSearch) {
                if (normalSearch.style.display !== 'none') {
                    // 切换到高级搜索模式
                    normalSearch.style.opacity = '0';
                    setTimeout(() => {
                        normalSearch.style.display = 'none';
                        advancedSearch.style.display = 'block';
                        setTimeout(() => {
                            advancedSearch.style.opacity = '1';
                        }, 50);
                    }, 300);
                } else {
                    // 切换到普通搜索模式
                    advancedSearch.style.opacity = '0';
                    setTimeout(() => {
                        advancedSearch.style.display = 'none';
                        normalSearch.style.display = 'block';
                        setTimeout(() => {
                            normalSearch.style.opacity = '1';
                        }, 50);
                    }, 300);
                }
            }
        });
    });

    // 为条件选择框添加事件监听
    const conditionSelects = document.querySelectorAll('.condition-select');
    conditionSelects.forEach(select => {
        select.addEventListener('change', function() {
            const conditionOptions = this.nextElementSibling;
            if (conditionOptions && conditionOptions.classList.contains('condition-options')) {
                if (this.value === '发信IP' || this.value === 'IP归属地' || this.value === '发件人' || this.value === '信头发件人' || this.value === '收件人' || this.value === '信头收件人' || this.value === '主题') {
                    // 重置条件选项
                    conditionOptions.innerHTML = `
                        <select class="select-input match-type-select">
                            <option>选择匹配类型</option>
                            <option>完全匹配</option>
                            <option>部分匹配</option>
                            <option>不匹配</option>
                        </select>
                        <input type="text" class="text-input condition-input" placeholder="请输入搜索内容">
                    `;
                    conditionOptions.style.display = 'flex';
                } else if (this.value === '沙箱检测') {
                    // 沙箱检测的特殊处理
                    conditionOptions.innerHTML = `
                        <select class="select-input sandbox-type-select">
                            <option>选择沙箱检测类型</option>
                            <option>威胁等级</option>
                            <option>威胁分类</option>
                        </select>
                        <select class="select-input sandbox-value-select" style="display: none;">
                            <option>选择值</option>
                        </select>
                    `;
                    conditionOptions.style.display = 'flex';
                    
                    // 为沙箱检测类型选择框添加事件监听
                    const sandboxTypeSelect = conditionOptions.querySelector('.sandbox-type-select');
                    const sandboxValueSelect = conditionOptions.querySelector('.sandbox-value-select');
                    
                    sandboxTypeSelect.addEventListener('change', function() {
                        if (this.value === '威胁等级') {
                            sandboxValueSelect.innerHTML = `
                                <option>选择威胁等级</option>
                                <option value="0">安全</option>
                                <option value="1">低风险</option>
                                <option value="2">中风险</option>
                                <option value="3">高风险</option>
                            `;
                            sandboxValueSelect.style.display = 'block';
                        } else if (this.value === '威胁分类') {
                            sandboxValueSelect.innerHTML = `
                                <option>选择威胁分类</option>
                                <option value="0">未定义</option>
                                <option value="1">病毒</option>
                                <option value="2">蠕虫</option>
                                <option value="3">木马</option>
                                <option value="4">后门</option>
                                <option value="5">漏洞</option>
                                <option value="6">黑客工具</option>
                                <option value="7">恶意软件</option>
                                <option value="8">广告软件</option>
                                <option value="9">色情</option>
                                <option value="10">风险软件</option>
                                <option value="11">间谍软件</option>
                                <option value="12">勒索者病毒</option>
                            `;
                            sandboxValueSelect.style.display = 'block';
                        } else {
                            sandboxValueSelect.style.display = 'none';
                        }
                    });
                } else {
                    conditionOptions.style.display = 'none';
                }
            }
        });
    });

    // 为添加条件按钮添加事件监听
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-condition-btn')) {
            const conditionContent = e.target.closest('.condition-content');
            const conditionRow = conditionContent.closest('.condition-row');
            const conditionType = conditionRow.nextElementSibling.dataset.conditionType;
            const container = conditionRow.nextElementSibling;
            
            // 创建新的条件行
            const newConditionRow = document.createElement('div');
            newConditionRow.className = 'filter-row condition-row';
            newConditionRow.innerHTML = `
                <div class="condition-content">
                    <select class="select-input condition-select">
                        <option>选择条件</option>
                        <option>发信IP</option>
                        <option>IP归属地</option>
                        <option>海外邮件</option>
                        <option>发件人</option>
                        <option>信头发件人</option>
                        <option>收件人</option>
                        <option>信头收件人</option>
                        <option>主题</option>
                    </select>
                    <!-- 匹配类型选择框和输入框 -->
                    <div class="condition-options" style="display: none;">
                        <select class="select-input match-type-select">
                            <option>选择匹配类型</option>
                            <option>完全匹配</option>
                            <option>部分匹配</option>
                            <option>不匹配</option>
                        </select>
                        <input type="text" class="text-input condition-input" placeholder="请输入搜索内容">
                    </div>
                    <div class="condition-buttons">
                        <button class="add-condition-btn">+</button>
                        <button class="remove-condition-btn">-</button>
                    </div>
                </div>
            `;
            
            // 添加到容器
            container.appendChild(newConditionRow);
            
            // 为新添加的选择框添加事件监听
            const newSelect = newConditionRow.querySelector('.condition-select');
            newSelect.addEventListener('change', function() {
                const conditionOptions = this.nextElementSibling;
                if (conditionOptions && conditionOptions.classList.contains('condition-options')) {
                    if (this.value === '发信IP' || this.value === 'IP归属地' || this.value === '发件人' || this.value === '信头发件人' || this.value === '收件人' || this.value === '信头收件人' || this.value === '主题') {
                        // 重置条件选项
                        conditionOptions.innerHTML = `
                            <select class="select-input match-type-select">
                                <option>选择匹配类型</option>
                                <option>完全匹配</option>
                                <option>部分匹配</option>
                                <option>不匹配</option>
                            </select>
                            <input type="text" class="text-input condition-input" placeholder="请输入搜索内容">
                        `;
                        conditionOptions.style.display = 'flex';
                    } else if (this.value === '沙箱检测') {
                        // 沙箱检测的特殊处理
                        conditionOptions.innerHTML = `
                            <select class="select-input sandbox-type-select">
                                <option>选择沙箱检测类型</option>
                                <option>威胁等级</option>
                                <option>威胁分类</option>
                            </select>
                            <select class="select-input sandbox-value-select" style="display: none;">
                                <option>选择值</option>
                            </select>
                        `;
                        conditionOptions.style.display = 'flex';
                        
                        // 为沙箱检测类型选择框添加事件监听
                        const sandboxTypeSelect = conditionOptions.querySelector('.sandbox-type-select');
                        const sandboxValueSelect = conditionOptions.querySelector('.sandbox-value-select');
                        
                        sandboxTypeSelect.addEventListener('change', function() {
                            if (this.value === '威胁等级') {
                                sandboxValueSelect.innerHTML = `
                                    <option>选择威胁等级</option>
                                    <option value="0">安全</option>
                                    <option value="1">低风险</option>
                                    <option value="2">中风险</option>
                                    <option value="3">高风险</option>
                                `;
                                sandboxValueSelect.style.display = 'block';
                            } else if (this.value === '威胁分类') {
                                sandboxValueSelect.innerHTML = `
                                    <option>选择威胁分类</option>
                                    <option value="0">未定义</option>
                                    <option value="1">病毒</option>
                                    <option value="2">蠕虫</option>
                                    <option value="3">木马</option>
                                    <option value="4">后门</option>
                                    <option value="5">漏洞</option>
                                    <option value="6">黑客工具</option>
                                    <option value="7">恶意软件</option>
                                    <option value="8">广告软件</option>
                                    <option value="9">色情</option>
                                    <option value="10">风险软件</option>
                                    <option value="11">间谍软件</option>
                                    <option value="12">勒索者病毒</option>
                                `;
                                sandboxValueSelect.style.display = 'block';
                            } else {
                                sandboxValueSelect.style.display = 'none';
                            }
                        });
                    } else {
                        conditionOptions.style.display = 'none';
                    }
                }
            });
        }
        
        // 为删除条件按钮添加事件监听
        if (e.target.classList.contains('remove-condition-btn')) {
            const conditionContent = e.target.closest('.condition-content');
            const conditionRow = conditionContent.closest('.condition-row');
            conditionRow.remove();
        }
    });
});