const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const btnCalculate = document.querySelector(".btn-calculate");

let dayVal = "",
  monthVal = "",
  yearVal = "";
dayEl.addEventListener("input", (e) => {
  dayVal = e.target.value;
  clearClassesAndColor(dayEl);
});
monthEl.addEventListener("input", (e) => {
  monthVal = e.target.value;
  clearClassesAndColor(monthEl);
});
yearEl.addEventListener("input", (e) => {
  yearVal = e.target.value;
  clearClassesAndColor(yearEl);
});

const clearClassesAndColor = (el) => {
  el.style.borderColor = "var(--clr-smokey-grey)";
  el.parentNode.children[0].style.color = "var(--clr-smokey-grey)";
  el.parentNode.children[2].style.visibility = "hidden";
};

const checkError = (e) => {
  if (!e.value) {
    e.parentNode.children[0].style.color = "hsl(0, 100%, 67%)";
    e.style.borderColor = "var(--clr-primary-light-red)";
    e.parentNode.children[2].style.visibility = "visible";
    return false;
  } else {
    return true;
  }
};

const checkErrorValue = (y, m, d) => {
  const yy = checkError(y);
  const mm = checkError(m);
  const dd = checkError(d);
  return yy && mm && dd;
};

btnCalculate.addEventListener("click", (e) => {
  if (!checkErrorValue(yearEl, monthEl, dayEl)) {
    return;
  }
  const date = new Date(Number(yearVal), Number(monthVal) - 1, Number(dayVal));

  const { years, months, days } = getAge(
    `${dayVal.padStart(2, "0")}/${monthVal.padStart(2, "0")}/${yearVal}`
  );

  setDate(days, months, years);
});

function getAge(dateString) {
  var now = new Date();

  var yearNow = now.getUTCFullYear();
  var monthNow = now.getUTCMonth();
  var dateNow = now.getUTCDate();

  var dob = new Date(
    dateString.substring(6, 10),
    dateString.substring(3, 5) - 1,
    dateString.substring(0, 2)
  );

  var yearDob = dob.getUTCFullYear();
  var monthDob = dob.getUTCMonth();
  var dateDob = dob.getUTCDate();
  yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  return {
    years: yearAge,
    months: monthAge,
    days: dateAge,
  };
}

function setDate(pday, pmonth, pyear) {
  document.getElementById("yr").innerHTML = `<span>${pyear}</span>years`;
  document.getElementById("mn").innerHTML = `<span>${pmonth}</span>months`;
  document.getElementById("dy").innerHTML = `<span>${pday}</span>days`;
}
