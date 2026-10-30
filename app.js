"use strict";
const projectDetails = {
  momentum: {
    eyebrow: "01 / CURRENT EXPLORATION",
    title: "非线性动量与中国期货市场",
    status: "进行中 · 论文复现与应用探索",
    sections: [
      ["正在追问", "动量信号与后续市场表现之间，是否存在值得进一步研究的非线性关系？相关论文的方法，在中国期货市场中该怎样理解与实现？"],
      ["当前工作", "以非线性动量论文复现为切入点，把文献阅读、数据处理与 Python 实现联系起来。关注的是研究方法及其适用条件，而不是仅寻找一条漂亮的回测曲线。"],
      ["接下来希望检验", ["建立可比较的基础动量基准，理解非线性方法带来的实际差异。", "关注样本外表现、交易成本、参数稳定性与中国期货数据的处理细节。", "整理代码、实验设置与研究记录，让每一步的假设和结果能够相互对应。"]]
    ],
    note: "本项目按复现探索中的状态展示，尚未在本站发布经核验的策略收益或实盘结果。"
  },
  quant: {
    eyebrow: "02 / LEARNING IN CODE",
    title: "0 → 100 Quant：量化学习档案",
    status: "学习实践 · 代码与 Notebook 笔记",
    sections: [
      ["为什么整理", "把分散的金融知识和编程练习放进一条连续的学习路径，通过代码实现理解模型，也记录遇到的问题。"],
      ["实践内容", ["数据处理：Python、NumPy、Pandas、AKShare 与 SQLite。", "经典模型：CAPM、Fama-French、期权定价与 Greeks、VaR / CVaR、Markowitz 组合优化。", "策略学习：均线、动量、均值回归、Backtrader 回测、因子构建与绩效分析。"]],
      ["继续拓展", "在特征工程与机器学习量化入门基础上，继续理解模型验证与研究流程。更复杂的模型属于学习与拓展方向，不作为已经完成的研究成果。"]
    ],
    note: "这是学习与实践记录。公开账户与贡献记录可通过页面下方的 GitHub 入口查看。"
  },
  garch: {
    eyebrow: "03 / EMPIRICAL STUDY",
    title: "股指期货与市场波动",
    status: "已完成的本科实证研究 · 2020",
    sections: [
      ["研究题目", "《基于 GARCH-M 模型的上证 50 股指期货对股市波动影响研究》。"],
      ["问题与方法", "围绕股指期货与现货市场波动的关系，清洗和整理相关金融时间序列，进行平稳性检验并构建 GARCH-M 模型。模型将条件波动引入均值方程，用于考察波动聚集与风险溢价。"],
      ["这段研究留下的基础", ["从金融问题出发，明确变量与模型设定。", "把数据清洗、时间序列检验、模型估计与解释联系起来。", "理解统计关系的适用条件，避免将单一模型的结果作过度推断。"]]
    ],
    note: "以本科实证研究经历展示，不代表期刊发表；本站未提供完整论文与原始估计表。"
  },
  financing: {
    eyebrow: "04 / EMPIRICAL STUDY",
    title: "产品市场竞争与融资成本",
    status: "已完成的本科实证研究 · 2020",
    sections: [
      ["研究问题", "产品市场竞争的激烈程度，与企业债务融资成本之间有怎样的关系？从信息不对称与经营风险角度，思考企业竞争环境对融资决策的影响。"],
      ["方法与数据", "以沪深 A 股企业为研究对象，整理样本数据、构建竞争程度与融资成本指标，使用 EViews / Matlab 开展多元回归分析。"],
      ["个人收获", ["将经济直觉转化为可估计的变量与模型。", "独立组织数据获取、清洗、估计与实证分析。", "在解释结果时，持续追问变量口径、模型设定与经济机制是否一致。"]]
    ],
    note: "以本科实证研究经历展示，不代表期刊发表；具体统计结论需结合原文样本与模型设定理解。"
  }
};

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute("aria-expanded", "false"); menuButton.setAttribute("aria-label", "打开导航菜单"); }
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  mobileNav.hidden = expanded;
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "打开导航菜单" : "关闭导航菜单");
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
const wideScreen = window.matchMedia("(min-width: 601px)");
wideScreen.addEventListener("change", event => { if (event.matches) closeMenu(); });

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterResult = document.querySelector(".filter-result");
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    projectCards.forEach(card => { card.hidden = category !== "all" && card.dataset.category !== category; if (!card.hidden) count += 1; });
    filterResult.textContent = "显示" + button.textContent + "：" + count + "项研究与实践";
  });
});

const dialog = document.querySelector("#project-dialog");
let lastProjectButton;
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const details = projectDetails[button.dataset.project];
    lastProjectButton = button;
    document.querySelector("#dialog-eyebrow").textContent = details.eyebrow;
    document.querySelector("#dialog-title").textContent = details.title;
    document.querySelector("#dialog-status").textContent = details.status;
    const content = document.querySelector("#dialog-content");
    content.replaceChildren();
    details.sections.forEach(([heading, value]) => {
      const h3 = document.createElement("h3"); h3.textContent = heading; content.append(h3);
      if (Array.isArray(value)) {
        const ul = document.createElement("ul"); value.forEach(text => { const li = document.createElement("li"); li.textContent = text; ul.append(li); }); content.append(ul);
      } else { const p = document.createElement("p"); p.textContent = value; content.append(p); }
    });
    const note = document.createElement("p"); note.className = "dialog-note"; note.textContent = details.note; content.append(note);
    closeMenu();
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.scrollTop = 0;
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".dialog-dismiss").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener("close", () => { document.body.classList.remove("dialog-open"); if (lastProjectButton) lastProjectButton.focus(); });

const shareButton = document.querySelector("#copy-link");
shareButton.addEventListener("click", async () => {
  const url = window.location.origin + window.location.pathname;
  const feedback = document.querySelector("#copy-feedback");
  try {
    await navigator.clipboard.writeText(url);
    feedback.textContent = "主页链接已复制，可以分享给朋友了。";
  } catch (_) {
    feedback.textContent = "主页链接：" + url;
  }
});
