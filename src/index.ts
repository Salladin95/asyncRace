import { AppController } from './components/controller';
import './styles/index.scss';

window.addEventListener('load', async () => {
  const controller = new AppController();
  await controller.initialize();
});
