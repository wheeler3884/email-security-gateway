// 测试脚本：测试导航栏折叠状态下的交互功能
console.log('开始测试导航栏交互功能...');

// 模拟点击折叠按钮
function testCollapseButton() {
    console.log('测试 1: 点击折叠按钮');
    const collapseBtn = document.querySelector('.collapse-btn');
    if (collapseBtn) {
        console.log('✓ 找到折叠按钮');
        collapseBtn.click();
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.classList.contains('collapsed')) {
                console.log('✓ 导航栏已成功折叠');
                testLogViewClick();
            } else {
                console.log('✗ 导航栏折叠失败');
            }
        }, 500);
    } else {
        console.log('✗ 未找到折叠按钮');
    }
}

// 测试折叠状态下点击日志查看链接
function testLogViewClick() {
    console.log('测试 2: 折叠状态下点击日志查看链接');
    const logViewLink = document.querySelector('.nav-item:nth-child(5) a');
    if (logViewLink) {
        console.log('✓ 找到日志查看链接');
        
        // 保存当前状态
        const subNav = logViewLink.nextElementSibling;
        const initialMaxHeight = subNav.style.maxHeight;
        
        console.log('点击前二级导航栏状态:', initialMaxHeight);
        
        // 点击日志查看链接
        logViewLink.click();
        
        setTimeout(() => {
            const newMaxHeight = subNav.style.maxHeight;
            console.log('点击后二级导航栏状态:', newMaxHeight);
            
            if (newMaxHeight !== initialMaxHeight) {
                console.log('✓ 二级导航栏状态已改变');
                testArrowClick();
            } else {
                console.log('✗ 二级导航栏状态未改变');
                testArrowClick();
            }
        }, 500);
    } else {
        console.log('✗ 未找到日志查看链接');
    }
}

// 测试折叠状态下点击箭头图标
function testArrowClick() {
    console.log('测试 3: 折叠状态下点击箭头图标');
    const arrow = document.querySelector('.nav-item:nth-child(5) a .float-right');
    if (arrow) {
        console.log('✓ 找到箭头图标');
        
        // 保存当前状态
        const subNav = arrow.closest('.nav-item').querySelector('.sub-nav');
        const initialMaxHeight = subNav.style.maxHeight;
        
        console.log('点击前二级导航栏状态:', initialMaxHeight);
        
        // 点击箭头图标
        arrow.click();
        
        setTimeout(() => {
            const newMaxHeight = subNav.style.maxHeight;
            console.log('点击后二级导航栏状态:', newMaxHeight);
            
            if (newMaxHeight !== initialMaxHeight) {
                console.log('✓ 二级导航栏状态已改变');
                testExpandButton();
            } else {
                console.log('✗ 二级导航栏状态未改变');
                testExpandButton();
            }
        }, 500);
    } else {
        console.log('✗ 未找到箭头图标');
    }
}

// 测试展开导航栏
function testExpandButton() {
    console.log('测试 4: 点击展开按钮');
    const collapseBtn = document.querySelector('.collapse-btn');
    if (collapseBtn) {
        collapseBtn.click();
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            if (!sidebar.classList.contains('collapsed')) {
                console.log('✓ 导航栏已成功展开');
                console.log('所有测试完成');
            } else {
                console.log('✗ 导航栏展开失败');
            }
        }, 500);
    }
}

// 页面加载完成后运行测试
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(testCollapseButton, 1000);
});