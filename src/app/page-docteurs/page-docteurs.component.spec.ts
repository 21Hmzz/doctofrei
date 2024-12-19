import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDocteursComponent } from './page-docteurs.component';

describe('PageDocteursComponent', () => {
  let component: PageDocteursComponent;
  let fixture: ComponentFixture<PageDocteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageDocteursComponent]
    });
    fixture = TestBed.createComponent(PageDocteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
