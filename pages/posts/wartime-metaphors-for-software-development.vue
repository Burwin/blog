<script setup lang="ts">
const post = {
  date: "2020-03-16",
  title: "Wartime Metaphors for Software Development",
  excerpt:
    "Good generals retreat when they're in disadvantageous positions. From a secure base, they could organize measured attacks. Without a secure base, they were left exposed to annihilation.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      Caesar built fortifications when his armies were camping. His enemies
      didn't always place the same emphasis on building defenses. Caesar
      defeated his enemies.
    </ElementsBp>
    <ElementsBp>
      Strong fortifications helped him to secure his position. Maintaining a
      secure position enabled him to focus on the most important part of the
      battle... establishing secure and efficient supply lines. Hungry armies
      don't fight well.
    </ElementsBp>
    <ElementsBp>
      Good generals retreat during battle itself. Undisciplined armies full of
      adrenaline easily charge, charge, and keep charging. A good charge becomes
      increasingly dangerous as it progresses. If the faction charging separates
      too far from the security of the main army, they can be easily surrounded
      and wiped out by the enemy. Faking retreat to entice undisciplined charges
      was a staple tactic of Genghis Khan.
    </ElementsBp>
    <ElementsBh2>How does this apply to business?</ElementsBh2>
    <ElementsBul>
      <ElementsBli>
        Build competitive moats to protect your market share
      </ElementsBli>
      <ElementsBli>Protect your supply lines</ElementsBli>
      <ElementsBli>Retreat?</ElementsBli>
    </ElementsBul>
    <ElementsBp>Retreat.</ElementsBp>
    <ElementsBp>
      Businesses can grow too quickly. As things go well, leadership may try to
      expand into new areas before properly securing their base. Expanding too
      rapidly leads to chaos. Business lines risk being overexposed to
      competition.
    </ElementsBp>
    <ElementsBp>
      It's not just the business lines that are at risk, but also the good
      employees. The first soldiers to flee are the cavalry... noblemen and
      elites of society. The agile ones, with options.
    </ElementsBp>
    <ElementsBh2> How does this apply to software? </ElementsBh2>
    <ElementsBp>
      Build fortifications. Automated tests, obviously. Be more diligent than
      your competitors, and you'll live to code another day.
    </ElementsBp>
    <ElementsBp>
      Your supply lines are your lifeblood. Don't skimp on CI/CD. If your
      world-changing features can't eat (get released), they'll either fight
      poorly, or not at all.
    </ElementsBp>
    <ElementsBp>
      Strong fortifications are essential to healthy supply lines.
    </ElementsBp>
    <ElementsBp>
      Don't build too fast. When you get away from your fortifications, you'll
      get wiped out when things take a bad turn, rather than being able to
      retreat to relative safety temporarily to regroup.
    </ElementsBp>
    <ElementsBp>
      Don't build new features until existing rudimentarily fortified. Go back
      and refortify older and more central features. Your castle keep is your
      last defense. It should be rock solid. Too many features without adequate
      fortifications leaves your software exposed to competitors. The general
      can enact strategy with organized units. He cannot direct a mob, and a
      disorganized mob is an easy target.
    </ElementsBp>
    <ElementsBp>
      When you're in a disadvantageous position, retreat (refactor!). Keep
      refactoring until you're in the advantageous position again. Fortify in
      stages... build a wooden wall, fortify that with rock, fortify that with
      towers. The longer you take to retreat, the more costly it becomes. You
      may have to leave behind siege equipment, cannons, or soldiers if you must
      eventually make a hasty retreat.
    </ElementsBp>
    <ElementsBp>
      Don't keep marching toward the narrow pass with
      <span class="italic"
        >just-so-happen-to-be-perfect-ledges-for-archers</span
      >
      on both sides simply because you want to "keep delivering value to
      customers". If your code is dead, it can't deliver value.
    </ElementsBp>
  </BlogPost>
</template>
