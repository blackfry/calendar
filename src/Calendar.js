import React from 'react';

const style = {
  day: {
    width: "6em",
    height: "6em",
    display: "inline-block",
    border: "1px solid black",
    textAlign: "center",
    lineHeight: "6em",
    cursor: 'pointer'
  },
  title: {
    textAlign: "center",
    padding: "1em"
  },
  titleMonth: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  pastDate: {
    backgroundColor: 'grey',
    cursor: 'not-allowed'
  },
  createAppointments: {
    width: '100%',
    height: '250px',
    border: '1px solid black',
    margin: '2em 0',
  },
  appointmentsTitle: {
    textAlign: 'center',
    paddingTop: '0.5em'
  },
  message: {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textArea: {
    display: 'block',
    margin: '1em',
    width: '96%',
    height: '80%'
  },
  hasAppointment: {
    backgroundColor: 'green'
  }
}

class Calendar extends React.Component {
  constructor() {
    super();
    const todaysDate = new Date();
    this.state = {
      date: todaysDate,
      currentDate: todaysDate.getDate(),
      showCreateAppointment: false,
      message: '',
      selectedDate: null,
      appointments: {},
    };
  }

  getMonthName(monthInt) {
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[monthInt]
  }


  daysInMonth() {
    let currentDate = this.state.date;
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return new Date(year, month, 0).getDate();
  }

  handleClick(e, x) {
    e.preventDefault();
    const currentDate = this.state.currentDate;
    const pastDate = x < currentDate - 1;
    const hasAppointment = !!this.state.appointments[x + 1];
    !pastDate
      ? this.setState({
        showCreateAppointment: true,
        message: hasAppointment ? 'An appointment already exists on this date' : '',
        selectedDate: x + 1,
      })
      : this.setState({
        showCreateAppointment: false,
        message: 'you can only make appointments for current and future dates'
      })
  }

  renderCalendarDay() {
    const daysInMonth = this.daysInMonth();
    const currentDate = this.state.currentDate;
    return [...Array(daysInMonth).keys()].map(x => {
      const pastDate = x < currentDate - 1;
      const hasAppointment = !!this.state.appointments[x + 1];
      return (
        <div
          style={
            Object.assign(
              {}, style.day,
              pastDate && style.pastDate,
              hasAppointment && style.hasAppointment
            )}
          key={x}
          onClick={(e) => this.handleClick(e, x)}>
          {x + 1}
        </div>
      )
    })
  }

  handleChange(event, selectedDate) {
    let appointments = Object.assign({}, this.state.appointments);
    appointments[selectedDate] = event.target.value;
    this.setState({
      appointments,
      selectedDate
    })
}  

  renderCreateAppointment() {
    return (
      this.state.showCreateAppointment &&
      <div style={style.createAppointments}>
        <div style={style.appointmentsTitle}>
          Enter appointment notes for {this.getMonthName(this.state.date.getMonth())} {this.state.selectedDate}
        </div>
        <textarea
          style={style.textArea}
          onChange={(e) => this.handleChange(e, this.state.selectedDate)}
          value={this.state.appointments[this.state.selectedDate] || ''} />
      </div>
    )
  }


  render() {
    return (
      <div style={{ display: 'block' }}>
        <div style={style.title}>
          Calendar for the month of
          <div style={style.titleMonth}>
            {this.getMonthName(this.state.date.getMonth())}
          </div>
        </div>
        {this.renderCalendarDay()}
        {this.renderCreateAppointment()}
        <div style={style.message}>
          {this.state.message}
        </div>
      </div>
    );
  }
}
export default Calendar;
