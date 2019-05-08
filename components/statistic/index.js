import Statistic from './Statistic';
import Countdown from './Countdown';

Statistic.Countdown = Countdown;
// console.log(0, Statistic, Statistic.Countdown);
/* istanbul ignore next */
Statistic.install = function(Vue) {
  Vue.component(Statistic.name, Statistic);
  Vue.component(Statistic.Countdown.name, Statistic.Countdown);
};

export default Statistic;
