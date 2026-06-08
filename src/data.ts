/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MugFrontOption, MugBackOption, MugModelOption, PackagingOption } from './types';

// Passo 1 — Opções de Frente da Caneca
export const FRONT_OPTIONS: MugFrontOption[] = [
  {
    id: 'e1',
    name: 'Modelo 1',
    description: '',
    image: 'https://i.ibb.co/HpFqbPNh/E1.webp'
  },
  {
    id: 'n1',
    name: 'Modelo 2',
    description: '',
    image: 'https://i.ibb.co/xKP3r3cJ/N1.webp'
  },
  {
    id: 'e2',
    name: 'Modelo 3',
    description: '',
    image: 'https://i.ibb.co/BVd44q06/E2.webp'
  },
  {
    id: 'n2',
    name: 'Modelo 4',
    description: '',
    image: 'https://i.ibb.co/DH71Wv3Y/N2.webp'
  },
  {
    id: 'e3',
    name: 'Modelo 5',
    description: '',
    image: 'https://i.ibb.co/1YfmZSrF/E3.webp'
  },
  {
    id: 'n3',
    name: 'Modelo 6',
    description: '',
    image: 'https://i.ibb.co/JFdgk9ZW/N3.webp'
  },
  {
    id: 'e4',
    name: 'Modelo 7',
    description: '',
    image: 'https://i.ibb.co/KjTmqH6x/E4.webp'
  },
  {
    id: 'n4',
    name: 'Modelo 8',
    description: '',
    image: 'https://i.ibb.co/Z6NTCB94/N4.webp'
  },
  {
    id: 'e5',
    name: 'Modelo 9',
    description: '',
    image: 'https://i.ibb.co/qMrgbsCx/E5.webp'
  },
  {
    id: 'n5',
    name: 'Modelo 10',
    description: '',
    image: 'https://i.ibb.co/8n16FVZp/N5.webp'
  },
  {
    id: 'e6',
    name: 'Modelo 11',
    description: '',
    image: 'https://i.ibb.co/RpNQk5Wk/E6.webp'
  },
  {
    id: 'n6',
    name: 'Modelo 12',
    description: '',
    image: 'https://i.ibb.co/Lqt4DbV/N6.webp'
  },
  {
    id: 'e7',
    name: 'Modelo 13',
    description: '',
    image: 'https://i.ibb.co/MxcGRqyV/E7.webp'
  },
  {
    id: 'n8',
    name: 'Modelo 14',
    description: '',
    image: 'https://i.ibb.co/BHms0HqH/N8.webp'
  },
  {
    id: 'e8',
    name: 'Modelo 15',
    description: '',
    image: 'https://i.ibb.co/Fk0mCvPm/E8.webp'
  },
  {
    id: 'n9',
    name: 'Modelo 16',
    description: '',
    image: 'https://i.ibb.co/mV2ZtFD3/N9.webp'
  },
  {
    id: 'e9',
    name: 'Modelo 17',
    description: '',
    image: 'https://i.ibb.co/HLK0WwgH/E9.webp'
  },
  {
    id: 'n10',
    name: 'Modelo 18',
    description: '',
    image: 'https://i.ibb.co/zTPNK0H6/N10.webp'
  },
  {
    id: 'e10',
    name: 'Modelo 19',
    description: '',
    image: 'https://i.ibb.co/wrcxzc8z/E10.webp'
  },
  {
    id: 'n11',
    name: 'Modelo 20',
    description: '',
    image: 'https://i.ibb.co/8LxBrcDC/N11.webp'
  },
  {
    id: 'n12',
    name: 'Modelo 21',
    description: '',
    image: 'https://i.ibb.co/jkXMPGbV/N12.webp'
  },
  {
    id: 'n13',
    name: 'Modelo 22',
    description: '',
    image: 'https://i.ibb.co/gZ7rqJH0/N13.webp'
  },
  {
    id: 'n14',
    name: 'Modelo 23',
    description: '',
    image: 'https://i.ibb.co/GQXSs98W/N14.webp'
  },
  {
    id: 'n15',
    name: 'Modelo 24',
    description: '',
    image: 'https://i.ibb.co/D32JRjn/N15.webp'
  }
];

// Passo 2 — Opções de Verso da Caneca
export const BACK_OPTIONS: MugBackOption[] = [
  {
    id: 'foto',
    name: 'Foto',
    description: '',
    image: 'https://i.ibb.co/h1HXpKWp/foto.jpg'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: '',
    image: 'https://i.ibb.co/ynCYTsNh/spotify.jpg'
  },
  {
    id: 'calendario',
    name: 'Calendário',
    description: '',
    image: 'https://i.ibb.co/b5Z2gmFb/calend-rio.jpg'
  },
  {
    id: 'nome',
    name: 'Nome',
    description: '',
    image: 'https://i.ibb.co/hRCvW4TW/nome.webp'
  }
];

// Passo 3 — Opções de Caneca
export const MUG_MODELS: MugModelOption[] = [
  {
    id: 'tradicional',
    name: 'Caneca Branca Tradicional',
    price: 38.90,
    category: 'branca',
    image: 'https://i.ibb.co/VWy088np/tradicional.jpg'
  },
  {
    id: 'amarela',
    name: 'Caneca Com Alça e Interior Amarela',
    price: 44.90,
    category: 'colorida',
    image: 'https://i.ibb.co/whd6575C/amarela.jpg'
  },
  {
    id: 'azul_colher',
    name: 'Caneca Com Alça e Interior Azul com Colher',
    price: 44.90,
    category: 'colher',
    image: 'https://i.ibb.co/v6Fvd0xv/azul.jpg'
  },
  {
    id: 'azul',
    name: 'Caneca Com Alça e Interior Azul',
    price: 44.90,
    category: 'colorida',
    image: 'https://i.ibb.co/B2zdQWCr/azul-c.jpg'
  },
  {
    id: 'azul_coracao',
    name: 'Caneca Com Alça Coração Azul',
    price: 49.90,
    category: 'coracao',
    image: 'https://i.ibb.co/d07qf6DB/azulcoracao.jpg'
  },
  {
    id: 'preta_coracao',
    name: 'Caneca Com Alça Coração Preta',
    price: 49.90,
    category: 'coracao',
    image: 'https://i.ibb.co/ynCHK9J6/preta.jpg'
  }
];

// Passo 4 — Opções de Embalagem (7 opções + "não quero embalagem")
export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'sem_embalagem',
    name: 'Somente Caneca Branca',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'emb_coracao_pelucia',
    name: 'Caixa kraft com pelúcia',
    price: 58.90,
    image: 'https://i.ibb.co/mFM6zYMx/Emb-Cora-o-Pel-cia.webp'
  },
  {
    id: 'emb_coracao_mdf',
    name: 'Caixa Coração em MDF',
    price: 89.90,
    image: 'https://i.ibb.co/r8rcnyz/Emb-Cora-o-MDF.webp'
  },
  {
    id: 'emb_tabua',
    name: 'Caixa kraft com madeira laser',
    price: 64.80,
    image: 'https://i.ibb.co/W43VFdw1/Emb-T-bua.webp'
  },
  {
    id: 'cesta_carinho',
    name: 'Cesta Carinho',
    price: 149.90,
    image: 'https://i.ibb.co/FL4TYkYN/Cestas-Caneca-Azulejo.webp'
  },
  {
    id: 'cesta_sonho',
    name: 'Cesta Sonho',
    price: 149.90,
    image: 'https://i.ibb.co/5XqNzDM3/Cesta-Sonho.webp'
  },
  {
    id: 'cesta_duo_plus',
    name: 'Cesta Duo 2 Canecas',
    price: 249.90,
    image: 'https://i.ibb.co/NggPSdyf/Cesta-Duo-Plus.webp'
  },
  {
    id: 'cesta_amor',
    name: 'Cesta Amor',
    price: 179.90,
    image: 'https://i.ibb.co/RprFp5hZ/Cesta-Amor.webp'
  }
];

export function getPackagingPrice(packagingId: string, mugPrice: number = 0): number {
  const pkg = PACKAGING_OPTIONS.find(p => p.id === packagingId);
  return pkg ? pkg.price : 38.90;
}

export const WHATSAPP_CONTACT_NUMBER = '5551997098567';
