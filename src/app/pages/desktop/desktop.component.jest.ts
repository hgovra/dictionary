import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Serviços

import { WordService } from '../../services/word.service';

// Rotas

import { mobileRoutes, desktopRoutes } from '../../app-routing.module';

// Componentes

import { DesktopComponent } from './desktop.component';
import { StackComponent } from '../../components/stack/stack.component';
import { StartComponent } from '../../components/start/start.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { TabsComponent } from '../../components/tabs/tabs.component';

// Mocks

import { successResponse } from '../../../../__mocks__/success-response';

let service: WordService;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      RouterTestingModule.withRoutes(mobileRoutes),
      RouterTestingModule.withRoutes(desktopRoutes),
      FontAwesomeModule,
      InfiniteScrollModule,
    ],
    declarations: [
      StackComponent,
      StartComponent,
      BannerComponent,
      TabsComponent,
      DesktopComponent,
    ],
    providers: [WordService],
  });
});

describe('DesktopComponent', () => {
  it('mostrar o logo do Dictionary', async () => {
    await render(DesktopComponent);

    const header = screen.getByRole('heading', { name: 'Dictionary' });

    expect(header).toBeInTheDocument();
  });

  it('montar duas áreas de conteúdo', async () => {
    await render(DesktopComponent);

    const sections = screen.getAllByRole('region');

    expect(sections.length).toBe(2);
  });

  it('carregar lista de palavras', async () => {
    await render(DesktopComponent);

    const stack = screen.getByTestId('word-stack');
    const pills = stack.getElementsByTagName('li');

    expect(pills.length).toBe(120);
  });

  it('carregar mais palavras ao rolar a lista até o final', async () => {
    await render(DesktopComponent);

    const container = screen.getByTestId('container-word-stack');
    const stack = screen.getByTestId('word-stack');
    const pills = stack.getElementsByTagName('li');

    // Para o teste, será necessário simular a altura do elemento sem o browser

    Object.defineProperty(container, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 200,
    });

    expect(pills.length).toBe(120);

    fireEvent.scroll(container, { target: { scrollTop: 200 } });

    expect(pills.length).toBe(240);
  });

  it('continuar carregando mais palavras toda vez que rolar a lista até o final', async () => {
    await render(DesktopComponent);

    const onScroll = jest.spyOn(StartComponent.prototype, 'onScroll');

    const container = screen.getByTestId('container-word-stack');

    // Para o teste, será necessário simular a altura do elemento sem o browser

    Object.defineProperty(container, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 200,
    });

    fireEvent.scroll(container, { target: { scrollTop: 200 } });

    // Aumentando o tamanho da lista para as novas palavras

    Object.defineProperty(container, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 400,
    });

    fireEvent.scroll(container, { target: { scrollTop: 400 } });

    await waitFor(() => {
      expect(onScroll).toBeCalledTimes(2);
    });
  });

  it('renovar a lista de palavras ao clicar no botão', async () => {
    await render(DesktopComponent);

    service = TestBed.inject(WordService);

    const btnRefresh = screen.getByTestId('refresh-btn');

    // Copiar a lista de palavras para comparação

    const wordsFirst = JSON.parse(JSON.stringify(service.list));

    await userEvent.click(btnRefresh);

    // Copiar a lista de novo depois de atualizar

    const wordsSecond = JSON.parse(JSON.stringify(service.list));

    expect(wordsSecond).not.toEqual(wordsFirst);
  });

  it('carregar detalhes da palavra ao clicar na pílula correspondente', async () => {
    await render(DesktopComponent);

    service = TestBed.inject(WordService);

    // Simular a função que obtém os dados da palavra escolhida
    // (no original, retorna um Observable assíncrono)

    const getTestWordDetails = () => {
      service.word = successResponse[0];
      service.isLoading = false;
    };

    jest.spyOn(service, 'getWordDetails').mockReturnValue(getTestWordDetails());

    const title = await screen.findByRole('heading', { name: /happy/i });

    expect(title).toBeInTheDocument();
  });
});
