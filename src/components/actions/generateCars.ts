import { Icar } from '../../system/contracts';
import { brands, colors } from '../../system/data';
import { AppState } from '../controller/contracts';
import { Observer } from '../oberver';
import { requestForCreateCar } from '../server';

const generateCars = async (reqs: Promise<Icar>[] = []): Promise<Icar[]> => {
  if (reqs.length === 100) {
    const values = Promise.all(reqs).then((cars) => cars as Icar[]);
    return values;
  }

  const indexName = Math.floor(Math.random() * brands.length);
  const indexColor = Math.floor(Math.random() * colors.length);

  reqs.push(requestForCreateCar(brands[indexName], colors[indexColor]));
  return generateCars(reqs);
};

export const onGenerateCars = (oberver: Observer<Icar>, options: AppState): void => {
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.generateCars')) {
      return;
    }
    const generatedCars = await generateCars();
    const newCars = oberver.data.concat(generatedCars);

    options.size = newCars.length;
    options.pages = Math.ceil(options.size / 10);

    oberver.updateData(newCars, options);
  });
};
