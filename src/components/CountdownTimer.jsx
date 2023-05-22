import React, { useState, useEffect } from 'react';
const DateTimeDisplay=( { value, type, isDanger } ) => {
  return (
    <span className={`countDown ${isDanger? 'bg-[red]  text-white p-3 font-bold text-[30px]': 'counter_gradient_color text-white p-3 font-bold text-[30px]'}`}>
      <span>{value} </span>
      <span>{type} </span>
    </span>
  );
};

const useCountdown=( targetDate ) => {
  const countDownDate=new Date( targetDate ).getTime();

  const [ countDown, setCountDown ]=useState(
    countDownDate-new Date().getTime()
  );

  useEffect( () => {
    const interval=setInterval( () => {
      setCountDown( countDownDate-new Date().getTime() );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ countDownDate ] );

  return getReturnValues( countDown );
};

const getReturnValues=( countDown ) => {
  // calculate time left
  const days=Math.floor( countDown/( 1000*60*60*24 ) );
  const hours=Math.floor(
    ( countDown%( 1000*60*60*24 ) )/( 1000*60*60 )
  );
  const minutes=Math.floor( ( countDown%( 1000*60*60 ) )/( 1000*60 ) );
  const seconds=Math.floor( ( countDown%( 1000*60 ) )/1000 );

  return [ days, hours, minutes, seconds ];
};

const ExpiredNotice=() => {
  return (
    <div className="expired-notice">
      <span className='text-[red] text-[1.2rem]'>Registrations are closed!</span>
      <p className='text-[red] text-[1.2rem]'>You can apply next year.</p>
    </div>
  );
};

const ShowCounter=( { days, hours, minutes, seconds } ) => {
  return (
    <div className="show-counter mt-4">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={'Days'} isDanger={days<=3} />
        <span className='mr-3 countDownSm'></span>
        <DateTimeDisplay value={hours} type={window.innerWidth < 400 ? 'Hrs' : 'Hours'} isDanger={false} />
        <span className='mr-3 countDownSm'></span>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <span className='mr-3 countDownSm'></span>
        <DateTimeDisplay value={seconds} type={window.innerWidth < 400 ? 'Secs': "Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer=( { targetDate } ) => {
  const [ days, hours, minutes, seconds ]=useCountdown( targetDate );

  if ( days+hours+minutes+seconds<=0 ) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
