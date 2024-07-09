export const argentinaDateFormatter = new Intl.DateTimeFormat('es-AR', {
  // weekday: 'long', // Full name of the weekday
  day: 'numeric', // Day of the month as a number
  month: 'numeric', // Full name of the month
  timeZone: 'America/Argentina/Buenos_Aires' // Specify the timezone
});

export const argentinaShortDateFormatter = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'numeric'
});