import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
);




// import {
//   DisplayProcessor,
//   SpecReporter,
//   StacktraceOption
// } from 'jasmine-spec-reporter';

// // import CustomReporter = jasmine.CustomReporter;
// // jasmine.getEnv().addReporter((new SpecReporter() as unknown) as CustomReporter);

// // var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// // jasmine.getEnv().addReporter(new SpecReporter());

// import SuiteInfo = jasmine.SuiteInfo;

// class CustomProcessor extends DisplayProcessor {
//   public displayJasmineStarted(info: SuiteInfo, log: string): string {
//     return `TypeScript ${log}`;
//   }
// }

// jasmine.getEnv().clearReporters();
// jasmine.getEnv().addReporter(
//   new SpecReporter({
//     spec: {
//       displayStacktrace: StacktraceOption.NONE
//     },
//     customProcessors: [CustomProcessor]
//   })
// );
