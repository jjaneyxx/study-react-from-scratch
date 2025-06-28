// 루트 폴더에 global.d.ts라는 파일 생성 - CSS 모듈을 위한 일반적인 타이핑 필요
// global.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }