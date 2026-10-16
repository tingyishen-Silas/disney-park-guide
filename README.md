# 10.17 上海迪士尼游园手册

独立手机 H5，适用日期为 **2026 年 10 月 17 日**。无构建依赖，无第三方字体/CDN，无统计、登录或后台。资源使用相对路径，可直接部署到 GitHub Pages 子目录或普通静态托管平台。

## 内容与编辑

- `dist/index.html`：入口与分享元信息。
- `dist/styles.css`：响应式布局，奶油色、深紫和南瓜橙视觉。
- `dist/data.js`：23 个项目、合并演出场次和 5 个蹦迪点位。
- `dist/app.js`：6 个模块的文案、筛选、图片查看与最近三场逻辑。
- `dist/assets/`：用户提供的参考截图，均已本地化。

## 预览

在此目录执行 `python3 -m http.server 4174 --directory dist`，打开 http://127.0.0.1:4174。

## 演出逻辑

日期与时间使用固定 UTC+08:00 解析；界面时钟使用 Asia/Shanghai。10 月 17 日之前展示首三场预览；当天将合并场次展开，按未来开场时间取三场。区间活动开始后单独展示“正在进行”，结束后移除。当天结束不滚动到次日；10 月 18 日起提示参考日已结束。页面每 15 秒、重新回到前台时刷新。基于设备时间，不联网校时。

## 部署

本项目沿用 GitHub Pages 静态托管。把 `dist` 内容放到发布分支根目录，在仓库 Pages 设置选取对应分支和 `/`。所有图片目录必须一起上传。`release/disney-park-guide.zip` 为可直接解压部署的站点包。

## 内容来源与不确定项

- 价格、早享经验时间、交通、场次、餐厅和群内优惠按用户提供内容整理；运营安排以当天官方 App 为准。
- 入园规则已参考官方规则及重返乐园攻略；手机支架具体形态、10:00 小镇开放界限、寄存 10–15 元和乐拍通套餐 6 人未独立获得针对本次产品的官方确认，网页已注明适用范围与现场/套餐确认。
- 餐厅“旺顺融”保留用户原文，尚待核对店铺名称。
- 万圣活动参考上海迪士尼度假区官方微博和官方网站，未取得官方公众号原文，不冒充已读取公众号。
- 五个蹦迪点位体验为用户提供的社交平台经验摘编，不保证人流、互动或视野。
- 星级与刺激程度是主观参考；矿山车归入刺激，加勒比海盗归入中等并保留较温和/小下坡说明。

官方参考：

- https://www.shanghaidisneyresort.com/gonglve/post/practical/ticket?source=menu
- https://www.shanghaidisneyresort.com/en/legal/park-rules/
- https://weibo.com/2/detail/5342988680037116
- https://www.shanghaidisneyresort.com/zh-cn/experience?group=seasonal-events-2
- https://weibo.com/2/detail/5353152635210264
