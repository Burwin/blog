<script setup lang="ts">
import { addHours } from "date-fns";
const post = {
  date: "2026-04-15",
  title: "Easy Domain Service Layers",
  excerpt:
    "Little ramble on a relatively easy and clean way to implement the Domain Services layer",
};

const fooService = `public class FooService
{
    private readonly IDbContext _dbContext;
    public FooService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task DeleteAsync(Foo foo) { ... }
}

// usage
await fooService.DeleteAsync(foo); `;

const fooExtensions = `public static class fooExtensions
{
    public static async Task DeleteAsync(IDbContext context) { ... }
}

// usage
await foo.DeleteAsync(dbContext); `;
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      I really like Domain Driven Design (DDD) for any non-trivial application
      that I write. This blog post is more an internal note to myself, so I
      won't get into much detail.
    </ElementsBp>

    <ElementsBp>
      But lately, I've been doing something on implementations in the Domain
      Services layer that I rather enjoy.
    </ElementsBp>

    <ElementsBp> First, the layers: </ElementsBp>

    <ElementsBul>
      <ElementsBli
        >DOMAIN: where all business logic should go if at all
        possible</ElementsBli
      >
      <ElementsBli>DATA: where we connect to our database</ElementsBli>
      <ElementsBli
        >DOMAIN SERVICES: where we put business logic that requires data context
      </ElementsBli>
      <ElementsBli
        >EVERYTHING ELSE: application code, API endpoints, scheduled jobs,
        etc...</ElementsBli
      >
    </ElementsBul>

    <ElementsBp>
      Before, if I needed something to live in the Domain Services layer, I
      would create a Domain Service.
    </ElementsBp>

    <ElementsBquote name="Example: FooService">
      <ElementsBcode :code="fooService" />
    </ElementsBquote>

    <ElementsBp>
      This causes cognitive debt, though, because I have to remember to inject
      the special FooService when I need it, and I have to remember that it even
      exists in case it might be useful to me. I don't have to remember that any
      of the other methods exist on `Foo` from the domain layer, because they're
      just available as intellisense all the time. So discovery is easy when
      working with the code.
    </ElementsBp>

    <ElementsBp>
      To make things cleaner, I'm starting to implement domain service layer
      logic as extension methods, instead.
    </ElementsBp>

    <ElementsBp>
      For example, let's suppose that I want to cascade an Archive of a Foo. Foo
      objects are related to Bar objects, and when I Archive a Foo I want to
      also Archive all related Bar objects.
    </ElementsBp>

    <ElementsBp>
      I can't do this at the Domain layer, because I need additional data
      context. It properly belongs in the Domain Service layer.
    </ElementsBp>

    <ElementsBp>
      This is now how I would likely do something like this:
    </ElementsBp>

    <ElementsBquote name="Example: fooExtensions">
      <ElementsBcode :code="fooExtensions" />
    </ElementsBquote>

    <ElementsBp>
      It probably seems less useful with my hyper-abreviated example above, but
      trust me, it's a game changer. When I'm working in the application with a
      Foo, I have the Foo. I can type `myFoo.` and see a bunch of possibilities
      via intellisense.
    </ElementsBp>

    <ElementsBp>
      This extension method approach to Domain Services implementations
      maintains that usefulness. I don't need to inject anything else. I just
      keep going. Discovery is massively improved.
    </ElementsBp>

    <ElementsBp>
      Not just discovery, but my code idioms are maintained, too. Everywhere
      else that I want to do something to a `Foo`, I start with `myFoo.`. Having
      to instead call `someOtherService.DoSomethingToMy(foo)` is awkward.
    </ElementsBp>

    <ElementsBp> Ahhh... but testability. </ElementsBp>

    <ElementsBp>
      The original implementation with the proper service is a little more
      test-flexible. If I needed to mock `DeleteAsync`, I can just mock it
      directly (likely by first extracting an interface `IFooService`). Not so
      with the extension method approach.
    </ElementsBp>

    <ElementsBp>
      In practice, I don't really come across cases where it makes sense to mock
      this method, though. If I really needed to, I still could indirectly by
      mocking the instance of `IDbContext` that I provide to the method in the
      test. It's more indirect, and requires me to have internal knowledge of
      the extension method. But it's an option in a pinch.
    </ElementsBp>

    <ElementsBp>
      There are other ways to mock this in a pinch if mocking the `IDbContext`
      isn't ideal, and it would start to add significant complexity to this
      approach. But overall, I think the beauty of the grammar typically makes
      up for the rare issues related to complex integration testing.
    </ElementsBp>
  </BlogPost>
</template>
