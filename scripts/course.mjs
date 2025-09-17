const byuiCourse = {
  code: "CSE121b",
  name: "JavaScript Language",
  sections: [
    { sectionNum: 1, enrolled: 26, room: "STC 353" },
    { sectionNum: 2, enrolled: 28, room: "STC 347" },
  ],

  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      if (add) {
        section.enrolled++;
      } else if (section.enrolled > 0) {
        section.enrolled--;
      }
    }
  }
};

export default byuiCourse;