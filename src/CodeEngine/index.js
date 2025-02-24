/* eslint-disable */
import * as babel from "./babel-standalone/babel.min.js";

class CodeEngine {
  /** @type {CodeEngine} */
  static instance;

  static getInstance() {
    this.instance = this.instance || new CodeEngine();
    return this.instance;
  }

  /**
   * 执行模板函数
   * @param {string} templateFunc - 模板函数代码
   * @param {Object} [context] - 执行上下文
   * @returns {*} 执行结果
   * @throws {Error} 执行错误
   */
  executeTemplateFunc(templateFunc, context) {
    try {
      const babelOptions = {
        presets: ["es2015", "stage-2"],
      };

      const wrapperCode = `
        function executeLowCodeTemplate() {
          ${templateFunc}
        }
      `;

      const compiledCode = babel.transform(wrapperCode, babelOptions);

      if (!compiledCode?.code) {
        throw new Error("代码转换失败，检查代码是否正确");
      }

      const scriptExecutor = new Function(
        "contextData",
        ...Object.keys(context),
        `
          ${compiledCode.code}
          return executeLowCodeTemplate();
        `
      );

      const result = scriptExecutor(context, ...Object.values(context));
      return result;
    } catch (error) {
      console.error("执行模板函数时发生错误:", error);
      throw error;
    } finally {
      // 资源清理缓存清理之类
    }
  }
}

export default CodeEngine;
